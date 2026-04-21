import type { MetadataRoute } from 'next';
import { featureData } from '@/lib/feature-data';

// Statischer Export (next.config.ts: output: "export") verlangt, dass die
// Sitemap zur Build-Zeit fixiert wird statt bei jedem Request.
export const dynamic = 'force-static';

const BASE_URL = 'https://www.partsunion.de';

/**
 * Dynamische Sitemap — wird bei `next build` als /sitemap.xml exportiert
 * (Next.js App-Router Konvention). `lastModified: new Date()` nutzt das
 * Build-Datum, damit Google sieht, dass wir die Seite aktiv pflegen.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${BASE_URL}/features`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/live-demo`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        ...featureData.map(f => ({
            url: `${BASE_URL}/features/${f.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })),
        { url: `${BASE_URL}/legal/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/legal/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/legal/agb`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/legal/widerruf`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ];
}
