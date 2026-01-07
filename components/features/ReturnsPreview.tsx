'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Truck, RotateCcw, Barcode, CheckCircle2, History } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ReturnsPreview() {
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanned(true);
            setTimeout(() => setScanned(false), 3000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900">Retouren-Eingang</h3>
                <div className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">MODE: SCAN</div>
            </div>

            <div className="relative flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl bg-white">
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ scale: scanned ? 1.1 : 1, color: scanned ? '#10b981' : '#64748b' }}
                        className="text-slate-400"
                    >
                        <Barcode size={64} />
                    </motion.div>
                    <div className="text-center">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Scannen Sie den QR/Barcode</div>
                        <div className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">RET-9238-A4</div>
                    </div>
                </div>

                {/* Laser Line */}
                <motion.div
                    animate={{ top: ['20%', '60%', '20%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute left-10 right-10 h-0.5 bg-red-500 shadow-[0_0_10px_red] opacity-40"
                />

                {/* Scanning Success Flash */}
                <AnimatePresence>
                    {scanned && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center z-20 backdrop-blur-[2px]"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-emerald-500 text-white p-4 rounded-full shadow-lg"
                            >
                                <CheckCircle2 size={32} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="space-y-3">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Vergangene Retouren</div>
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg text-xs shadow-sm">
                        <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center">
                            <RotateCcw size={14} className="text-slate-500" />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-slate-900">Luftfilter (Spezial)</div>
                            <div className="text-[10px] text-slate-500">Vor 2 Std. • Zurück im Bestand</div>
                        </div>
                        <div className="text-emerald-600 font-bold">+1</div>
                    </div>
                ))}
            </div>

            <div className="absolute top-2 left-2 p-4 opacity-5 pointer-events-none">
                <Truck size={120} />
            </div>
        </div>
    );
}
