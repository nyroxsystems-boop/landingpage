"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

/**
 * Cookie consent banner — DSGVO / § 25 TDDDG compliant.
 *
 * The landing page only uses strictly necessary first-party storage (theme
 * preference, cookie-consent flag). No third-party analytics, no tracking
 * pixels, no remarketing tags. The banner is therefore informational +
 * opt-in and does not load any tracker until the user explicitly accepts.
 *
 * Storage:
 *   localStorage['pu-cookie-consent'] = 'accepted' | 'rejected'
 *   localStorage['pu-cookie-consent-ts'] = ISO timestamp
 *
 * The banner re-appears if the user clears their storage or the consent is
 * older than 365 days (DSGVO refresh rule).
 */

const CONSENT_KEY = "pu-cookie-consent";
const CONSENT_TS_KEY = "pu-cookie-consent-ts";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

type Consent = "accepted" | "rejected" | null;

function readConsent(): Consent {
    if (typeof window === "undefined") return null;
    try {
        const value = localStorage.getItem(CONSENT_KEY) as Consent;
        const ts = localStorage.getItem(CONSENT_TS_KEY);
        if (!value || !ts) return null;
        if (Date.now() - new Date(ts).getTime() > ONE_YEAR_MS) return null;
        return value;
    } catch {
        return null;
    }
}

function writeConsent(value: Exclude<Consent, null>) {
    try {
        localStorage.setItem(CONSENT_KEY, value);
        localStorage.setItem(CONSENT_TS_KEY, new Date().toISOString());
        // Notify subscribers of the storage-change so the banner hook
        // re-renders immediately instead of waiting for navigation.
        window.dispatchEvent(new Event("pu-consent-change"));
    } catch {
        /* ignore storage errors */
    }
}

// useSyncExternalStore integration for the consent state. The snapshot is
// 'pending' on the server and true/false on the client so SSR never flashes
// the banner and React 19's stricter effect rules are avoided entirely.
function subscribe(callback: () => void) {
    window.addEventListener("pu-consent-change", callback);
    window.addEventListener("storage", callback);
    return () => {
        window.removeEventListener("pu-consent-change", callback);
        window.removeEventListener("storage", callback);
    };
}

function getSnapshot(): "visible" | "hidden" {
    return readConsent() === null ? "visible" : "hidden";
}

function getServerSnapshot(): "visible" | "hidden" {
    return "hidden";
}

export function CookieBanner() {
    const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    if (state !== "visible") return null;

    const accept = () => writeConsent("accepted");
    const reject = () => writeConsent("rejected");

    return (
        <div
            role="dialog"
            aria-label="Cookie-Einwilligung"
            aria-live="polite"
            className="fixed inset-x-0 bottom-0 z-[100] border-t border-border/60 bg-background/95 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-6xl flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:gap-6 md:p-6">
                <div className="flex-1 text-sm text-foreground/90">
                    <p className="mb-1 font-display text-base font-semibold text-foreground">
                        Wir respektieren Ihre Privatsphäre
                    </p>
                    <p className="leading-relaxed text-muted-foreground">
                        Wir verwenden ausschließlich technisch notwendige Speicherung im Browser
                        (z.B. für Ihre Einwilligung). Es werden keine Tracking-Cookies, kein
                        Analytics und keine Drittanbieter-Dienste geladen. Details finden Sie in
                        unserer{" "}
                        <Link
                            href="/legal/datenschutz"
                            className="text-primary underline underline-offset-2 hover:text-primary/80"
                        >
                            Datenschutzerklärung
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row md:flex-shrink-0">
                    <button
                        type="button"
                        onClick={reject}
                        className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                    >
                        Nur notwendige
                    </button>
                    <button
                        type="button"
                        onClick={accept}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                    >
                        Einverstanden
                    </button>
                </div>
            </div>
        </div>
    );
}
