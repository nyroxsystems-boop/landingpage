'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
    product: [
        { label: 'Features', href: '/features' },
        { label: 'WhatsApp Bot', href: '/features/whatsapp-bot' },
        { label: 'OEM-Ermittlung', href: '/features/oem-ermittlung' },
        { label: 'Warenwirtschaft', href: '/features/bestandssynchronisation' },
    ],
    company: [
        { label: 'Über uns', href: '/about' },
        { label: 'Kontakt', href: '/contact' },
        { label: 'Beratungstermin', href: '/#beratung' },
    ],
    legal: [
        { label: 'Impressum', href: '/legal/impressum' },
        { label: 'Datenschutz', href: '/legal/datenschutz' },
        { label: 'AGB', href: '/legal/agb' },
    ]
};

export function Footer() {
    return (
        <footer className="relative border-t border-border/50 bg-muted/30">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/logo.png"
                                alt="Partsunion"
                                width={160}
                                height={48}
                                className="h-10 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </Link>
                        <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                            Das intelligente Betriebssystem für den modernen Autoteilehandel.
                            KI-Automatisierung, die Ihren Umsatz steigert.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <a href="mailto:anfrage@partsunion.de" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-4 w-4" />
                                anfrage@partsunion.de
                            </a>
                            <a href="tel:+493012345678" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                <Phone className="h-4 w-4" />
                                +49 30 12345678
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Produkt</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Unternehmen</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Rechtliches</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Partsunion. Alle Rechte vorbehalten.
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Made in Germany 🇩🇪</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
