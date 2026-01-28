'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Database, ScanLine, Brain, ShoppingCart, Truck, Zap, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WhatsAppPreview } from './WhatsAppPreview';
import { WAWIPreview } from './WAWIPreview';

const tabs = [
    {
        id: 'bot',
        label: 'KI-Mitarbeiter',
        icon: Bot,
        content: {
            title: 'Ihr KI-Mitarbeiter im WhatsApp',
            subtitle: 'Technologie die mitdenkt',
            features: [
                {
                    icon: ScanLine,
                    title: 'OCR Fahrzeugschein-Scanner',
                    text: 'Fotografieren statt Tippen. Unsere KI extrahiert HSN, TSN, VIN und Baujahr in Millisekunden aus jedem Foto.'
                },
                {
                    icon: Brain,
                    title: 'Versteht "Mechaniker-Slang"',
                    text: 'Egal ob "Bremsbeläge" oder "Klötze", "Lichtmaschine" oder "Generator" - die KI versteht den Kontext.'
                },
                {
                    icon: Database,
                    title: 'Auto-OEM Matching',
                    text: 'Der Bot gleicht die Anfrage sofort mit Ihrer Datenbank ab und findet die exakte OEM-Nummer.'
                },
                {
                    icon: Globe,
                    title: 'Sprachübergreifend',
                    text: 'Versteht Sprachnachrichten in mehreren Sprachen und antwortet automatisch in der Kundensprache.'
                }
            ]
        }
    },
    {
        id: 'wawi',
        label: 'Warenwirtschaft',
        icon: Database,
        content: {
            title: 'Das Herzstück Ihres Handels',
            subtitle: 'Volle Kontrolle, null Stress',
            features: [
                {
                    icon: ShoppingCart,
                    title: 'Multi-Channel Sync',
                    text: 'eBay, Webshop und Thekenverkauf in Echtzeit synchronisiert. Keine Überverkäufe mehr.'
                },
                {
                    icon: Truck,
                    title: 'Automatischer Einkauf',
                    text: 'Meldebestand erreicht? Das System generiert Bestellvorschläge beim günstigsten Lieferanten.'
                },
                {
                    icon: ScanLine,
                    title: 'Retouren-Management',
                    text: 'Scannen Sie Retouren einfach ein. Das System bucht Bestand zurück und erstellt die Gutschrift.'
                },
                {
                    icon: Zap,
                    title: 'Blitzschnelle Angebote',
                    text: '3 Angebote aus verschiedenen Preisgruppen werden parallel erstellt. Sekunden statt Minuten.'
                }
            ]
        }
    }
];

export function TechTabs() {
    const [activeTab, setActiveTab] = useState('bot');

    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/30" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full glass text-sm font-medium text-primary mb-4">
                            Intelligenz trifft Effizienz
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                            Technologie, die <span className="text-gradient">mitdenkt</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Wechseln Sie die Ansicht für Details.
                        </p>
                    </motion.div>
                </div>

                {/* Tab Switcher */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-12"
                >
                    <div className="glass p-1.5 rounded-full inline-flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all',
                                    activeTab === tab.id
                                        ? 'gradient-primary text-white shadow-lg shadow-primary/25'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Tab Content */}
                <div className="max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        {tabs.map((tab) => {
                            if (tab.id !== activeTab) return null;

                            return (
                                <motion.div
                                    key={tab.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid lg:grid-cols-12 gap-12 items-center"
                                >
                                    {/* Features List */}
                                    <div className="lg:col-span-5 space-y-6">
                                        <div>
                                            <span className="text-sm text-primary font-medium">{tab.content.subtitle}</span>
                                            <h3 className="text-3xl font-bold mt-2" style={{ fontFamily: 'var(--font-display)' }}>
                                                {tab.content.title}
                                            </h3>
                                        </div>
                                        <div className="space-y-5">
                                            {tab.content.features.map((feature, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                                    className="flex gap-4 group"
                                                >
                                                    <div className={cn(
                                                        "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                                                        tab.id === 'bot'
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'bg-success/10 text-success'
                                                    )}>
                                                        <feature.icon size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold mb-1">{feature.title}</h4>
                                                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.text}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Preview Area */}
                                    <div className="lg:col-span-7 relative">
                                        <div className="relative z-10">
                                            {tab.id === 'bot' ? (
                                                <WhatsAppPreview />
                                            ) : (
                                                <div className="scale-[0.85] origin-center -my-12">
                                                    <WAWIPreview />
                                                </div>
                                            )}
                                        </div>

                                        {/* Status Badge */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="absolute -bottom-4 -right-4 md:bottom-4 md:right-4 glass p-4 rounded-xl shadow-xl hidden md:flex items-center gap-3 z-20"
                                        >
                                            <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                                            <div>
                                                <div className="font-semibold text-sm">System Status</div>
                                                <div className="text-xs text-muted-foreground">24/7 Operativ</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
