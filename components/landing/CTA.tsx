'use client';

import { Button } from '@/components/ui/Button';

export function CTA() {
    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Starten Sie heute Ihre Transformation</h2>
                <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Werden Sie einer von über 500 Teilehändlern, die bereits mit Partsunion automatisieren.
                </p>
                <Button size="lg" variant="secondary" className="font-bold">
                    Kostenloses Beratungsgespräch
                </Button>
            </div>
        </section>
    );
}
