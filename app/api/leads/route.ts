import { NextRequest, NextResponse } from 'next/server';

const CRM_API_URL = process.env.CRM_API_URL;

if (!CRM_API_URL) {
    console.warn('[Lead API] CRM_API_URL not set — lead submissions will fail');
}

// ── Input sanitization ──
// Strip any HTML tags, scripts, and control characters from user input so
// nothing that lands in the CRM can be abused by a downstream consumer that
// renders the data without escaping. Length-caps every field so a huge
// payload can't be used for DoS or to pollute our CRM logs.
function sanitizeString(input: unknown, maxLength = 2000): string {
    if (typeof input !== 'string') return '';
    return input
        // Remove any HTML-like tags (including partial ones)
        .replace(/<[^>]*>/g, '')
        // Remove control characters (keep tab, newline, carriage return)
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        .trim()
        .slice(0, maxLength);
}

// ── Simple in-memory rate limiting (per IP) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 leads per minute per IP

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || entry.resetAt < now) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
}

// Cleanup expired entries periodically
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of rateLimitMap.entries()) {
            if (entry.resetAt < now) rateLimitMap.delete(key);
        }
    }, 60000);
}

export async function POST(request: NextRequest) {
    try {
        // ── Rate Limiting ──
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || 'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.' },
                { status: 429 }
            );
        }

        const body = await request.json();

        // ── Honeypot / Bot Detection ──
        // Check honeypot BEFORE sanitization so we don't waste cycles on obvious bots
        if (body.website || body.url || body.homepage) {
            console.log('[Lead API] Honeypot triggered, blocking spam submission');
            return NextResponse.json({ success: true, id: 'blocked' }, { status: 201 });
        }

        // --- Sanitize and validate required fields ---
        const firma = sanitizeString(body.firma, 200);
        const ansprechpartner = sanitizeString(body.ansprechpartner, 200);
        const telefon = sanitizeString(body.telefon, 50);
        const email = sanitizeString(body.email, 200).toLowerCase();
        const nachricht = sanitizeString(body.nachricht, 5000);
        const source = sanitizeString(body.source, 50) || 'Website';
        const consent = body.consent === true;

        // DSGVO: reject any submission without explicit consent
        if (!consent) {
            return NextResponse.json(
                { error: 'Einwilligung zur Datenverarbeitung fehlt.' },
                { status: 400 }
            );
        }

        // Require at minimum: a name, a company, and an email address.
        // Phone is no longer strictly required (contact form has no phone field).
        if (!firma || !ansprechpartner || !email) {
            return NextResponse.json(
                { error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
                { status: 400 }
            );
        }

        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
                { status: 400 }
            );
        }

        // ── Basic content checks ──
        const allText = `${firma} ${ansprechpartner} ${nachricht}`.toLowerCase();
        const spamPatterns = [/\bviagra\b/, /\bcasino\b/, /\bcrypto\b/, /\bsex\b/, /\bpharmacy\b/, /http[s]?:\/\//i];
        if (spamPatterns.some(p => p.test(allText))) {
            console.log('[Lead API] Spam content detected, blocking');
            return NextResponse.json({ success: true, id: 'blocked' }, { status: 201 });
        }

        // --- Map form fields → CRM Lead schema ---
        const leadPayload = {
            company: firma,
            contactPerson: ansprechpartner,
            phone: telefon || '—',
            email,
            notes: nachricht,
            source: source === 'contact-page' ? 'Website (Kontakt)' : 'Website',
            status: 'Neu',
            tags: ['Website-Lead'],
            consentGivenAt: new Date().toISOString(),
        };

        // --- Forward to CRM backend ---
        if (!CRM_API_URL) {
            console.error('[Lead API] CRM_API_URL not configured');
            return NextResponse.json(
                { error: 'Kontaktformular ist derzeit nicht verfügbar.' },
                { status: 503 }
            );
        }

        const response = await fetch(`${CRM_API_URL}/api/crm/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadPayload),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('[Lead API] CRM backend error:', response.status, errorData);
            return NextResponse.json(
                { error: 'Lead konnte nicht gespeichert werden. Bitte versuchen Sie es später erneut.' },
                { status: 502 }
            );
        }

        const created = await response.json();
        return NextResponse.json({ success: true, id: created.pk || created.id }, { status: 201 });
    } catch (error) {
        console.error('[Lead API] Unexpected error:', error);
        return NextResponse.json(
            { error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
            { status: 500 }
        );
    }
}
