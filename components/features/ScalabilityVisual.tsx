'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Users, Bot, CheckCircle2 } from 'lucide-react';

const chatBubbles = [
    { name: 'Müller KFZ', msg: 'Bremsen für A4...', delay: 0, x: -30, y: -40 },
    { name: 'Schmidt Auto', msg: 'Turbolader Golf...', delay: 0.3, x: 40, y: -10 },
    { name: 'KFZ Weber', msg: 'Ölfilter BMW...', delay: 0.6, x: -20, y: 30 },
    { name: 'Auto König', msg: 'Kupplung Passat...', delay: 0.9, x: 50, y: 60 },
    { name: 'Teile Express', msg: 'Stoßdämpfer...', delay: 1.2, x: -40, y: 80 },
];

export function ScalabilityVisual() {
    return (
        <div className="relative w-full h-[280px] md:h-[320px]">
            {/* Central AI Hub */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                    <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Bot className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                </div>
            </motion.div>

            {/* Animated Connection Lines + Chat Bubbles */}
            {chatBubbles.map((bubble, i) => (
                <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 z-10"
                    style={{ x: bubble.x * 2.2, y: bubble.y * 1.3 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: bubble.delay + 0.5, duration: 0.4 }}
                >
                    {/* Connection Line */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-blue-500/60 to-transparent origin-left"
                        style={{
                            width: Math.sqrt(bubble.x * bubble.x + bubble.y * bubble.y) * 1.5,
                            rotate: `${Math.atan2(-bubble.y, -bubble.x) * (180 / Math.PI)}deg`,
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: bubble.delay + 0.3, duration: 0.5 }}
                    />

                    {/* Chat Bubble */}
                    <div className="glass border border-border/50 rounded-xl p-2.5 md:p-3 shadow-lg min-w-[130px] md:min-w-[150px]">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Users className="h-3 w-3 text-emerald-400" />
                            </div>
                            <span className="text-[9px] md:text-[10px] font-semibold text-foreground truncate">{bubble.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MessageSquare className="h-3 w-3 text-blue-400 shrink-0" />
                            <span className="text-[8px] md:text-[9px] text-muted-foreground truncate">{bubble.msg}</span>
                        </div>

                        {/* Processing indicator */}
                        <motion.div
                            className="flex items-center gap-1 mt-1.5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: bubble.delay + 1.2, duration: 0.3 }}
                        >
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            <span className="text-[8px] text-emerald-400 font-medium">Bearbeitet</span>
                        </motion.div>
                    </div>
                </motion.div>
            ))}

            {/* Counter Badge */}
            <motion.div
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 glass p-2 md:p-3 rounded-xl border border-emerald-500/30 shadow-lg z-30"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2, duration: 0.4 }}
            >
                <div className="text-[10px] text-muted-foreground">Gleichzeitig</div>
                <div className="text-lg md:text-xl font-bold text-emerald-400">∞ Anfragen</div>
            </motion.div>
        </div>
    );
}
