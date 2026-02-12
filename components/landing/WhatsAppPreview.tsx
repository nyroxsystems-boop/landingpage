'use client';

import { motion } from 'framer-motion';

const messages = [
    {
        type: 'user',
        content: 'Hi, brauche Bremsen für meinen Golf. Hier ist der Schein.',
        image: null,
        delay: 0
    },
    {
        type: 'user',
        content: null,
        image: 'fahrzeugschein',
        delay: 0.5
    },
    {
        type: 'bot',
        content: 'Alles klar! Ich habe den Golf VII 2.0 TDI (150 PS) erkannt. Fahrgestellnummer endet auf ...1923.',
        delay: 2
    },
    {
        type: 'bot',
        content: 'Hier ist das Angebot für die Vorderachse:\n\n1x Brembo Scheiben + Beläge\nPreis: 145,90 €\nLieferung: Morgen',
        isOffer: true,
        delay: 3.5
    }
];

function FahrzeugscheinPreview() {
    return (
        <div className="relative h-32 w-48 rounded-md overflow-hidden bg-white p-2 shadow-sm">
            {/* Header stripe */}
            <div className="h-3 w-full bg-teal-500 rounded-sm mb-1.5" />
            <div className="text-[6px] font-bold text-gray-700 mb-1">Zulassungsbescheinigung Teil I</div>

            {/* Fields */}
            <div className="space-y-1">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <div className="text-[5px] text-gray-400">HSN</div>
                        <div className="h-2.5 bg-gray-100 rounded-sm flex items-center px-1">
                            <span className="text-[6px] font-mono text-gray-600">0603</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-[5px] text-gray-400">TSN</div>
                        <div className="h-2.5 bg-gray-100 rounded-sm flex items-center px-1">
                            <span className="text-[6px] font-mono text-gray-600">BNK</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-[5px] text-gray-400">FIN / VIN</div>
                    <div className="h-2.5 bg-gray-100 rounded-sm flex items-center px-1">
                        <span className="text-[6px] font-mono text-gray-600">WVWZZZ1KZAW1923XX</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <div className="text-[5px] text-gray-400">Erstzulassung</div>
                        <div className="h-2.5 bg-gray-100 rounded-sm flex items-center px-1">
                            <span className="text-[6px] font-mono text-gray-600">15.03.2019</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-[5px] text-gray-400">Leistung</div>
                        <div className="h-2.5 bg-gray-100 rounded-sm flex items-center px-1">
                            <span className="text-[6px] font-mono text-gray-600">110 kW</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scan animation overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-transparent to-transparent"
                initial={{ y: '-100%' }}
                whileInView={{ y: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1.2, ease: 'linear' }}
            />
            <motion.div
                className="absolute left-0 right-0 h-0.5 bg-blue-400/60"
                initial={{ top: 0, opacity: 0 }}
                whileInView={{ top: '100%', opacity: [0, 1, 1, 0] }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1.2, ease: 'linear' }}
            />
        </div>
    );
}

export function WhatsAppPreview() {
    return (
        <div className="w-[300px] sm:w-[320px] mx-auto bg-slate-900 rounded-[40px] p-3 border-[6px] border-slate-900 shadow-2xl relative overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-900 rounded-b-xl z-20" />

            {/* Status Bar */}
            <div className="h-10 bg-[#075E54] w-full rounded-t-[30px] flex items-end pb-2 px-6 justify-between text-white text-[10px] font-medium z-10">
                <span>9:41</span>
                <div className="flex gap-1">
                    <span>5G</span>
                    <span>100%</span>
                </div>
            </div>

            {/* Header */}
            <div className="bg-[#075E54] p-3 flex items-center gap-3 text-white">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs">🤖</div>
                <div>
                    <div className="font-bold text-sm">Autoteile Bot</div>
                    <div className="text-[10px] opacity-80">online</div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="bg-[#E5DDD5] h-[400px] sm:h-[450px] p-4 flex flex-col gap-3 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]" />

                {messages.map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: msg.delay, duration: 0.4 }}
                        className={`relative z-10 max-w-[85%] p-2 rounded-lg text-sm shadow-sm ${msg.type === 'user'
                            ? 'bg-[#DCF8C6] self-end rounded-tr-none'
                            : 'bg-white self-start rounded-tl-none'
                            }`}
                    >
                        {msg.image === 'fahrzeugschein' && (
                            <div className="mb-1">
                                <FahrzeugscheinPreview />
                            </div>
                        )}
                        {msg.content && <p className="text-gray-800 whitespace-pre-line">{msg.content}</p>}

                        {msg.isOffer && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                                <button className="w-full bg-[#00A884] text-white py-1 rounded text-xs font-bold uppercase tracking-wide">
                                    Bestellen
                                </button>
                            </div>
                        )}

                        <span className="text-[9px] text-gray-400 absolute bottom-1 right-2 block leading-none">
                            9:4{2 + i}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Input Area */}
            <div className="bg-[#F0F0F0] p-2 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-gray-400">+</div>
                <div className="flex-1 bg-white h-8 rounded-full px-3 text-xs flex items-center text-gray-400">Nachricht...</div>
                <div className="h-8 w-8 rounded-full bg-[#00A884] flex items-center justify-center text-white">🎤</div>
            </div>

            {/* Home Bar */}
            <div className="h-1 w-24 bg-gray-300 rounded-full mx-auto mt-2" />
        </div>
    );
}
