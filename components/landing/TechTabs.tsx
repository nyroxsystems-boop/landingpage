'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Database, ScanLine, Brain, ShoppingCart, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
    {
        id: 'bot',
        label: 'Autoteile Bot',
        icon: Bot,
        color: 'bg-blue-500',
        content: {
            title: 'Ihr KI-Mitarbeiter im WhatsApp',
            features: [
                {
                    icon: ScanLine,
                    title: 'OCR Fahrzeugschein-Scanner',
                    text: 'Fotografieren statt Tippen. Unsere KI extrahiert HSN, TSN, VIN und Baujahr in Millisekunden aus jedem Foto.'
                },
                {
                    icon: Brain,
                    title: 'Versteht "Mechaniker-Slang"',
                    text: 'Egal ob "Bremsbeläge" oder "Klötze", "Lichtmaschine" oder "Generator" - die NLU-Engine versteht den Kontext.'
                },
                {
                    icon: Database,
                    title: 'Auto-OEM Matching',
                    text: 'Der Bot gleicht die Anfrage sofort mit Ihrer Datenbank ab und findet die exakte OEM-Nummer.'
                }
            ]
        }
    },
    {
        id: 'wawi',
        label: 'Warenwirtschaft',
        icon: Database,
        color: 'bg-emerald-500',
        content: {
            title: 'Das Herzstück Ihres Handels',
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
                }
            ]
        }
    }
];

import { WhatsAppPreview } from './WhatsAppPreview';
import { DashboardPreview } from './DashboardPreview';

export function TechTabs() {
    const [activeTab, setActiveTab] = useState('bot');

    return (
        <section className="py-20 md:py-32 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Technologie, die mitdenkt</h2>
                    <p className="text-muted-foreground text-lg">Wechseln Sie die Ansicht für Details.</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="bg-background border border-border p-1 rounded-full inline-flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all',
                                    activeTab === tab.id
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

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
                                    <div className="lg:col-span-5 space-y-8">
                                        <h3 className="text-3xl font-bold">{tab.content.title}</h3>
                                        <div className="space-y-6">
                                            {tab.content.features.map((feature, idx) => (
                                                <div key={idx} className="flex gap-4">
                                                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", tab.id === 'bot' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600')}>
                                                        <feature.icon size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold mb-1">{feature.title}</h4>
                                                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Component Preview Area */}
                                    <div className="lg:col-span-7 relative">
                                        <div className="relative z-10">
                                            {tab.id === 'bot' ? (
                                                <WhatsAppPreview />
                                            ) : (
                                                <div className="scale-75 -translate-y-12">
                                                    <DashboardPreview />
                                                </div>
                                            )}
                                        </div>

                                        {/* Status Tag for Wawi when in Bot view? No, let's just keep it simple */}
                                        <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 shadow-xl p-4 rounded-xl border border-border hidden md:block z-20">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                                                <span className="font-bold text-sm">System Status: Operativ</span>
                                            </div>
                                        </div>
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
