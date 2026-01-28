import { Metadata } from 'next';
import { featureData } from '@/lib/feature-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
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
    const isValueProp = feature.category === 'value';

    return (
        <div className="pt-24 pb-20 overflow-x-hidden">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-b from-muted/20 via-background to-background -z-10" />
            <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <Link
                    href="/features"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Zurück zur Übersicht
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Content */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div>
                            <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-6 ${isValueProp ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                                }`}>
                                <Icon className="h-8 w-8" />
                            </div>
                            <span className={`inline-block ml-4 py-1 px-3 rounded-full text-xs font-medium ${isValueProp
                                    ? 'bg-accent/10 text-accent'
                                    : 'bg-primary/10 text-primary'
                                }`}>
                                {isValueProp ? 'Vorteil' : 'Core Feature'}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-tight text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                                {feature.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="glass border border-border/50 rounded-2xl p-6 md:p-8">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-success" />
                                Was Sie bekommen
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-4">
                                {feature.features.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                                        <span className="text-foreground/80 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technical Details */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                                So funktioniert's
                            </h3>
                            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                                <p>{feature.technicalDetails}</p>
                            </div>
                        </div>

                        {/* Benefit Box */}
                        <div className={`p-6 md:p-8 rounded-2xl relative overflow-hidden group ${isValueProp
                                ? 'bg-accent/5 border border-accent/20'
                                : 'bg-primary/5 border border-primary/20'
                            }`}>
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <Icon size={80} />
                            </div>
                            <div className="relative z-10">
                                <h4 className={`font-bold mb-2 flex items-center gap-2 ${isValueProp ? 'text-accent' : 'text-primary'
                                    }`}>
                                    <Zap className="h-4 w-4" />
                                    Der Partsunion Vorteil
                                </h4>
                                <p className="text-foreground/80 leading-relaxed font-medium">
                                    {feature.benefit}
                                </p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/#beratung">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="h-14 px-8 text-lg gradient-primary shadow-xl shadow-primary/20 group"
                                >
                                    Beratungstermin buchen
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Animated Visual */}
                    <div className="sticky top-32">
                        <div className="relative aspect-square lg:aspect-[4/5] glass rounded-3xl overflow-hidden border border-border/50 shadow-2xl flex items-center justify-center">
                            {/* Background Glow */}
                            <div className={`absolute -top-1/4 -right-1/4 w-full h-full blur-[120px] rounded-full ${isValueProp ? 'bg-accent/20' : 'bg-primary/20'
                                }`} />
                            <div className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-blue-500/10 blur-[120px] rounded-full" />

                            <div className="relative z-10 w-full h-full p-6 md:p-8">
                                {previewMap[finalParams.slug] || (
                                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground/30">
                                        <Icon size={120} className="mb-4" />
                                        <p className="font-mono text-sm uppercase tracking-widest">Preview Pending</p>
                                    </div>
                                )}
                            </div>

                            {/* Decorative Label */}
                            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 glass rounded-full z-20">
                                <div className={`h-2 w-2 rounded-full animate-pulse ${isValueProp ? 'bg-accent' : 'bg-primary'
                                    }`} />
                                <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
                                    {isValueProp ? 'Vorteil' : 'Live System Preview'}
                                </span>
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
