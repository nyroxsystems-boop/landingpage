'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Download, Printer, Share2 } from 'lucide-react';

export function InvoicePreview() {
    return (
        <div className="w-full h-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-border overflow-hidden flex flex-col shadow-2xl">
            {/* Header / Toolbar */}
            <div className="bg-white dark:bg-slate-800 border-b border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <FileText size={18} />
                    </div>
                    <span className="font-bold text-sm">Rechnungs-Designer</span>
                </div>
                <div className="flex gap-2">
                    <div className="flex bg-muted rounded-md p-1 p-0.5">
                        <button className="px-3 py-1 text-xs font-medium bg-white dark:bg-slate-700 shadow-sm rounded">Clean</button>
                        <button className="px-3 py-1 text-xs font-medium text-muted-foreground">Classic</button>
                        <button className="px-3 py-1 text-xs font-medium text-muted-foreground">Modern</button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-border p-4 space-y-6 hidden md:block bg-white dark:bg-slate-800/50">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-muted-foreground mb-2 block">Logo Position</label>
                        <div className="grid grid-cols-3 gap-1">
                            <div className="h-8 border border-primary bg-primary/5 rounded flex items-center justify-center text-[10px] font-medium">Links</div>
                            <div className="h-8 border border-border rounded flex items-center justify-center text-[10px] font-medium">Mitte</div>
                            <div className="h-8 border border-border rounded flex items-center justify-center text-[10px] font-medium">Rechts</div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold uppercase text-muted-foreground mb-2 block">Primärfarbe</label>
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-primary" />
                            <div className="h-8 flex-1 border border-border rounded px-2 flex items-center text-[10px] font-mono">#2563EB</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                        <div className="h-8 w-full border border-border rounded" />
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 p-6 overflow-y-auto bg-slate-200/50 dark:bg-slate-950/50">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white dark:bg-slate-900 aspect-[1/1.4] w-full max-w-md mx-auto shadow-xl rounded-sm p-8 text-[10px] text-slate-800 dark:text-slate-300 relative overflow-hidden"
                    >
                        {/* A4 Paper feel */}
                        <div className="flex justify-between mb-12">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">PU</div>
                            <div className="text-right">
                                <h2 className="text-lg font-bold text-primary mb-1 uppercase tracking-tighter italic">Rechnung</h2>
                                <p className="text-muted-foreground">RE-2026-001</p>
                                <p className="text-muted-foreground">Datum: 07.01.2026</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="font-bold text-slate-900 dark:text-white mb-1">Empfänger:</p>
                            <p>Autohaus Meyer GmbH</p>
                            <p>Teilstraße 45</p>
                            <p>12345 Berline</p>
                        </div>

                        {/* Table */}
                        <table className="w-full mb-8">
                            <thead>
                                <tr className="border-b-2 border-primary/20 text-primary font-bold">
                                    <th className="text-left py-2">Position</th>
                                    <th className="text-center py-2">Menge</th>
                                    <th className="text-right py-2">Preis</th>
                                    <th className="text-right py-2">Gesamt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="py-2 font-medium">Bremsscheibe Belüftet (VA)</td>
                                    <td className="text-center py-2">2</td>
                                    <td className="text-right py-2">89,90 €</td>
                                    <td className="text-right py-2 font-bold">179,80 €</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">Bremsbelagsatz (VA)</td>
                                    <td className="text-center py-2">1</td>
                                    <td className="text-right py-2">45,00 €</td>
                                    <td className="text-right py-2 font-bold">45,00 €</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end pt-4 border-t-2 border-slate-100">
                            <div className="w-32 space-y-1">
                                <div className="flex justify-between">
                                    <span>Zwischensumme:</span>
                                    <span>224,80 €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>MwSt. (19%):</span>
                                    <span>42,71 €</span>
                                </div>
                                <div className="flex justify-between font-bold text-sm text-primary pt-2">
                                    <span>Gesamt:</span>
                                    <span>267,51 €</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Decoration */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                    </motion.div>
                </div>
            </div>

            {/* Footer / Actions */}
            <div className="bg-background border-t border-border p-3 flex justify-end gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    <Download size={14} /> Als PDF exportieren
                </button>
            </div>
        </div>
    );
}
