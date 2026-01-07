import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-muted py-12 border-t border-border">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-xl font-bold text-foreground">
                            <span className="text-primary">Parts</span>union
                        </Link>
                        <p className="mt-4 text-muted-foreground max-w-xs">
                            Die intelligente Softwarelösung für den modernen Autoteilehandel.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Produkt</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/features" className="hover:text-primary">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
                            <li><Link href="/about" className="hover:text-primary">Über uns</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Rechtliches</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/legal/impressum" className="hover:text-primary">Impressum</Link></li>
                            <li><Link href="/legal/datenschutz" className="hover:text-primary">Datenschutz</Link></li>
                            <li><Link href="/legal/agb" className="hover:text-primary">AGB</Link></li>
                            <li><Link href="/legal/widerruf" className="hover:text-primary">Widerruf</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-sm text-muted-foreground border-t border-border/50 pt-8">
                    © {new Date().getFullYear()} Partsunion. Alle Rechte vorbehalten.
                </div>
            </div>
        </footer>
    );
}
