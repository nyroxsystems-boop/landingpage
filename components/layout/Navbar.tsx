'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { featureData } from '@/lib/feature-data';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFeatureMenuOpen, setIsFeatureMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            // On sub-pages, we want sticky effect immediately or always visible
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine nav styling based on page location
    const navBackground = isHomePage
        ? (isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent')
        : 'bg-background/95 backdrop-blur-md border-b border-border'; // Always readable on sub-pages

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                navBackground
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-foreground">
                        <span className="text-primary">Parts</span>union
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Dropdown for Features */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsFeatureMenuOpen(true)}
                            onMouseLeave={() => setIsFeatureMenuOpen(false)}
                        >
                            <Link
                                href="/features"
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 py-4"
                            >
                                Features <ChevronDown className="h-4 w-4" />
                            </Link>

                            {/* Dropdown Menu */}
                            <div className={cn(
                                "absolute top-full left-0 w-64 bg-background border border-border rounded-xl shadow-xl p-2 transition-all duration-200 transform origin-top-left",
                                isFeatureMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            )}>
                                {featureData.map(feature => {
                                    const Icon = feature.icon;
                                    return (
                                        <Link
                                            key={feature.slug}
                                            href={`/features/${feature.slug}`}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium">{feature.title}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Pricing
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Über uns
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            Kontakt
                        </Link>
                        <Button variant="primary" size="sm">
                            Beratung vereinbaren
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-background border-b border-border p-4 max-h-[80vh] overflow-y-auto shadow-2xl">
                    <div className="flex flex-col gap-4">
                        <div className="font-bold text-primary mb-2">Features</div>
                        <div className="pl-4 border-l-2 border-primary/20 flex flex-col gap-3">
                            {featureData.map(feature => (
                                <Link
                                    key={feature.slug}
                                    href={`/features/${feature.slug}`}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {feature.title}
                                </Link>
                            ))}
                        </div>

                        <div className="font-bold text-primary mt-2">Menü</div>
                        <Link
                            href="/pricing"
                            className="text-sm font-medium text-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Über uns
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Kontakt
                        </Link>
                        <Button className="w-full mt-4">Beratung vereinbaren</Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
