'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function OCRScannerPreview() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((s) => (s + 1) % 4);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden relative font-mono text-xs">
            {/* Camera View Overlay */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-blue-100 mix-blend-multiply" />
            </div>

            {/* Scanning Frame */}
            <div className="absolute inset-12 border-2 border-slate-900/10 rounded-lg z-10">
                <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20"
                />

                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-blue-600" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-blue-600" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-600" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-blue-600" />
            </div>

            {/* Data Extraction Overlay */}
            <div className="absolute top-4 left-4 right-4 z-30 flex gap-2">
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-3 rounded-xl flex-1 shadow-sm">
                    <div className="text-blue-600 font-bold mb-2 flex items-center gap-2">
                        <Scan size={14} /> OCR ENGINE ACTIVE
                    </div>
                    <div className="space-y-1 text-slate-500">
                        <div className="flex justify-between">
                            <span>HSN/TSN:</span>
                            <motion.span animate={{ opacity: step >= 1 ? 1 : 0.3 }} className="text-slate-900 font-bold">0603 / BKX</motion.span>
                        </div>
                        <div className="flex justify-between">
                            <span>FIN/VIN:</span>
                            <motion.span animate={{ opacity: step >= 2 ? 1 : 0.3 }} className="text-slate-900 font-bold text-[10px]">WVWZZZAUZGW...1293</motion.span>
                        </div>
                        <div className="flex justify-between">
                            <span>BUILT:</span>
                            <motion.span animate={{ opacity: step >= 3 ? 1 : 0.3 }} className="text-slate-900 font-bold">2016-08-14</motion.span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Matching Result */}
            <AnimatePresence>
                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-4 left-4 right-4 z-40 bg-white border border-emerald-500/50 p-4 rounded-xl shadow-xl flex items-center gap-4"
                    >
                        <div className="h-10 w-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 text-sm">FAHRZEUG IDENTIFIZIERT</div>
                            <div className="text-[10px] text-slate-500">VW Golf VII Variant (BA5, BV5) 2.0 TDI</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Data Stream */}
            <div className="absolute bottom-4 left-4 h-24 overflow-hidden opacity-30 text-[8px] text-blue-900 pointer-events-none">
                <div className="animate-scroll-y">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <p key={i}>HEX_{Math.random().toString(16).slice(2, 8)}: FETCHING_METADATA_FROM_TECDOC_API...</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
