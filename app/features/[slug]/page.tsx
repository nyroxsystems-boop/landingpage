import { Metadata } from 'next';
import { featureData } from '@/lib/feature-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    return featureData.map((feature) => ({
        slug: feature.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const finalParams = await params;
    const feature = featureData.find((f) => f.slug === finalParams.slug);
    if (!feature) return { title: 'Feature nicht gefunden' };

    return {
        title: `${feature.title} - Partsunion Features`,
        description: feature.description,
    };
}

import { InvoicePreview } from '@/components/features/InvoicePreview';
import { OCRScannerPreview } from '@/components/features/OCRScannerPreview';
import { WhatsAppPreview } from '@/components/landing/WhatsAppPreview';
import { AutomatedOrderPreview } from '@/components/features/AutomatedOrderPreview';
import { SyncDashPreview } from '@/components/features/SyncDashPreview';
import { ReturnsPreview } from '@/components/features/ReturnsPreview';

const previewMap: Record<string, React.ReactNode> = {
    'automatische-rechnungserstellung': <InvoicePreview />,
    'oem-ermittlung': <OCRScannerPreview />,
    'whatsapp-bot': <WhatsAppPreview />,
    'bestellprozess': <AutomatedOrderPreview />,
    'bestandssynchronisation': <SyncDashPreview />,
    'retourenmanagement': <ReturnsPreview />,
};

export default async function FeatureDetailPage({ params }: Props) {
    const finalParams = await params;
    const feature = featureData.find((f) => f.slug === finalParams.slug);

    if (!feature) {
        notFound();
    }

    const Icon = feature.icon;

    return (
        <div className="pt-24 pb-20 overflow-x-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <Link href="/features" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Zurück zur Übersicht
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Content */}
                    <div className="space-y-10">
                        <div>
                            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary mb-6">
                                <Icon className="h-8 w-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">{feature.title}</h1>
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>

                        <div className="bg-muted/30 border border-border rounded-2xl p-8">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                Was Sie bekommen
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {feature.features.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-foreground/80 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-4">Ihre Transformation</h3>
                            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                                <p>{feature.technicalDetails}</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-8 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <Icon size={80} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                                    <Zap className="h-4 w-4 fill-primary" />
                                    Der Partsunion Vorteil
                                </h4>
                                <p className="text-foreground/80 leading-relaxed font-medium">{feature.benefit}</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button variant="primary" size="lg" className="h-14 px-8 text-lg shadow-xl shadow-primary/20">
                                Jetzt Demo anfordern
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                                Preis ansehen
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Animated Visual */}
                    <div className="sticky top-32">
                        <div className="relative aspect-square lg:aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden border border-border/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex items-center justify-center">
                            {/* Background Glow */}
                            <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-primary/20 blur-[120px] rounded-full" />
                            <div className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-blue-500/10 blur-[120px] rounded-full" />

                            <div className="relative z-10 w-full h-full p-6 md:p-8">
                                {previewMap[finalParams.slug] || (
                                    <div className="flex flex-col items-center justify-center h-full text-white/20">
                                        <Icon size={120} className="mb-4" />
                                        <p className="font-mono text-sm uppercase tracking-widest">Preview Pending</p>
                                    </div>
                                )}
                            </div>

                            {/* Decorative Label */}
                            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full z-20">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Live System Preview</span>
                            </div>
                        </div>

                        {/* Caption */}
                        <p className="mt-6 text-center text-sm text-muted-foreground italic">
                            * Repräsentative Visualisierung der Partsunion {feature.title} Technologie.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
