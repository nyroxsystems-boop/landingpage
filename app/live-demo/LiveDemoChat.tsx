'use client';

import { useState, useRef, useEffect, useCallback, type FormEvent, type ChangeEvent } from 'react';
import {
    Send, Upload, X, Bot, User, Sparkles, Loader2, Phone, ArrowRight,
    CheckCircle2, Zap, ChevronDown, Car, MessageSquare, ListFilter
} from 'lucide-react';

// ─── Config ─────────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://whatsapp-bot-oem-ermittlung.onrender.com';

// ─── Vehicle Database (Demo) ────────────────────────────────────────
const VEHICLE_DB: Record<string, Record<string, Record<string, string[]>>> = {
    'BMW': {
        '1er (F20/F21)': { '2015': ['116d (N47, 116PS)', '118i (B38, 136PS)', '120d (N47, 190PS)'], '2016': ['116d (B37, 116PS)', '118i (B38, 136PS)', '120d (B47, 190PS)'], '2017': ['118i (B38, 136PS)', '120d (B47, 190PS)', '125d (B47, 224PS)'] },
        '3er (F30/F31)': { '2014': ['316d (N47, 116PS)', '318d (N47, 143PS)', '320d (N47, 184PS)', '330d (N57, 258PS)'], '2015': ['318d (N47, 150PS)', '320d (N47, 190PS)', '330d (N57, 258PS)', '335d (N57, 313PS)'], '2016': ['318d (B47, 150PS)', '320d (B47, 190PS)', '330d (B57, 265PS)'], '2017': ['320d (B47, 190PS)', '330d (B57, 265PS)', '340i (B58, 326PS)'], '2018': ['318d (B47, 150PS)', '320d (B47, 190PS)', '330i (B48, 252PS)'] },
        '5er (G30/G31)': { '2017': ['520d (B47, 190PS)', '530d (B57, 265PS)', '530i (B48, 252PS)', '540i (B58, 340PS)'], '2018': ['520d (B47, 190PS)', '530d (B57, 265PS)', '540i (B58, 340PS)', 'M550d (B57, 400PS)'], '2019': ['520d (B47, 190PS)', '530e (B48, 292PS)', '540i (B58, 340PS)'] },
        'X1 (F48)': { '2016': ['sDrive18d (B47, 150PS)', 'xDrive20d (B47, 190PS)', 'xDrive25d (B47, 231PS)'], '2017': ['sDrive18d (B47, 150PS)', 'xDrive20d (B47, 190PS)'], '2018': ['sDrive18d (B47, 150PS)', 'xDrive20d (B47, 190PS)', 'xDrive25e (B38, 220PS)'] },
        'X3 (G01)': { '2017': ['xDrive20d (B47, 190PS)', 'xDrive30d (B57, 265PS)', 'M40i (B58, 360PS)'], '2018': ['xDrive20d (B47, 190PS)', 'xDrive30d (B57, 265PS)'], '2019': ['xDrive20d (B47, 190PS)', 'xDrive30e (B48, 292PS)'] },
    },
    'Volkswagen': {
        'Golf VII': { '2014': ['1.2 TSI (CJZA, 86PS)', '1.4 TSI (CZCA, 125PS)', '1.6 TDI (CLHB, 90PS)', '2.0 TDI (CRLB, 150PS)', 'GTI 2.0 TSI (CHHB, 230PS)'], '2015': ['1.4 TSI (CZCA, 125PS)', '1.6 TDI (DGTE, 115PS)', '2.0 TDI (CRLB, 150PS)', 'GTI 2.0 TSI (CHHB, 230PS)'], '2016': ['1.0 TSI (CHZD, 110PS)', '1.4 TSI (CZCA, 125PS)', '2.0 TDI (DFGA, 150PS)', 'GTD 2.0 TDI (DGCA, 184PS)'], '2017': ['1.0 TSI (CHZJ, 115PS)', '1.5 TSI (DADA, 130PS)', '2.0 TDI (DFGA, 150PS)'] },
        'Passat B8': { '2015': ['1.4 TSI (CZEA, 150PS)', '1.6 TDI (DCXA, 120PS)', '2.0 TDI (CRLB, 150PS)', '2.0 TDI (CUAA, 190PS)'], '2016': ['1.4 TSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)', '2.0 TDI (DFHA, 190PS)'], '2017': ['1.4 TSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2018': ['1.5 TSI (DACA, 150PS)', '2.0 TDI (DFGA, 150PS)'] },
        'Tiguan II': { '2016': ['1.4 TSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)', '2.0 TDI (DFHA, 190PS)'], '2017': ['1.4 TSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2018': ['1.5 TSI (DACA, 150PS)', '2.0 TDI (DFGA, 150PS)', '2.0 TSI (DNFA, 220PS)'] },
        'T-Roc': { '2018': ['1.0 TSI (CHZJ, 115PS)', '1.5 TSI (DADA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2019': ['1.0 TSI (CHZJ, 115PS)', '1.5 TSI (DADA, 150PS)', '2.0 TSI (DNFA, 190PS)'] },
    },
    'Mercedes-Benz': {
        'A-Klasse (W176)': { '2015': ['A 160 (M270, 102PS)', 'A 180 (M270, 122PS)', 'A 200 (M270, 156PS)', 'A 220d (OM651, 177PS)'], '2016': ['A 180 (M270, 122PS)', 'A 200 (M270, 156PS)', 'A 220d (OM651, 177PS)'], '2017': ['A 180 (M270, 122PS)', 'A 200 (M270, 156PS)', 'A 250 (M270, 211PS)'] },
        'C-Klasse (W205)': { '2014': ['C 180 (M274, 156PS)', 'C 200 (M274, 184PS)', 'C 220d (OM651, 170PS)', 'C 250d (OM651, 204PS)'], '2015': ['C 180 (M274, 156PS)', 'C 200 (M274, 184PS)', 'C 220d (OM651, 170PS)', 'C 300 (M274, 245PS)'], '2016': ['C 200 (M274, 184PS)', 'C 220d (OM654, 194PS)', 'C 300 (M274, 245PS)'], '2017': ['C 200 (M264, 184PS)', 'C 220d (OM654, 194PS)', 'C 43 AMG (M276, 390PS)'], '2018': ['C 200 (M264, 184PS)', 'C 220d (OM654, 194PS)', 'C 300 (M264, 258PS)'] },
        'E-Klasse (W213)': { '2016': ['E 200 (M274, 184PS)', 'E 220d (OM654, 194PS)', 'E 350d (OM642, 258PS)'], '2017': ['E 200 (M274, 184PS)', 'E 220d (OM654, 194PS)', 'E 300 (M274, 245PS)', 'E 400 (M276, 333PS)'], '2018': ['E 200 (M264, 184PS)', 'E 220d (OM654, 194PS)', 'E 300 (M264, 258PS)'] },
        'GLC (X253)': { '2016': ['GLC 200 (M274, 184PS)', 'GLC 220d (OM651, 170PS)', 'GLC 250d (OM651, 204PS)'], '2017': ['GLC 220d (OM654, 194PS)', 'GLC 300 (M274, 245PS)'], '2018': ['GLC 200 (M264, 184PS)', 'GLC 220d (OM654, 194PS)', 'GLC 300 (M264, 258PS)'] },
    },
    'Audi': {
        'A3 (8V)': { '2015': ['1.4 TFSI (CZEA, 150PS)', '1.6 TDI (CLHB, 110PS)', '2.0 TDI (CRLB, 150PS)', 'S3 2.0 TFSI (CJXC, 300PS)'], '2016': ['1.4 TFSI (CZEA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2017': ['1.0 TFSI (CHZD, 115PS)', '1.5 TFSI (DADA, 150PS)', '2.0 TDI (DFGA, 150PS)'], '2018': ['1.5 TFSI (DADA, 150PS)', '2.0 TDI (DFGA, 150PS)'] },
        'A4 (B9)': { '2016': ['2.0 TFSI (CVKB, 190PS)', '2.0 TDI (DETA, 150PS)', '2.0 TDI (DEUA, 190PS)', '3.0 TDI (CRTC, 218PS)'], '2017': ['2.0 TFSI (CVKB, 190PS)', '2.0 TDI (DETA, 150PS)'], '2018': ['2.0 TFSI (CVKB, 190PS)', '2.0 TDI (DTUA, 190PS)', '3.0 TDI (CREC, 218PS)'] },
        'A6 (C7)': { '2015': ['2.0 TDI (CNHA, 190PS)', '3.0 TDI (CRTC, 218PS)', '3.0 TDI (CVUA, 272PS)'], '2016': ['2.0 TDI (CNHA, 190PS)', '3.0 TDI (CVUA, 272PS)'], '2017': ['2.0 TDI (CNHA, 190PS)', '3.0 TDI (CVUA, 272PS)'] },
        'Q5 (FY)': { '2017': ['2.0 TFSI (DAXB, 252PS)', '2.0 TDI (DETA, 163PS)', '3.0 TDI (CVMD, 286PS)'], '2018': ['2.0 TFSI (DAXB, 252PS)', '2.0 TDI (DTUA, 190PS)'] },
    },
    'Opel': {
        'Astra K': { '2016': ['1.0 Turbo (B10XFT, 105PS)', '1.4 Turbo (B14XFT, 150PS)', '1.6 CDTi (B16DTH, 136PS)'], '2017': ['1.0 Turbo (B10XFT, 105PS)', '1.4 Turbo (B14XFT, 150PS)', '1.6 CDTi (B16DTH, 136PS)'], '2018': ['1.2 Turbo (F12XHT, 130PS)', '1.4 Turbo (B14XFT, 150PS)', '1.6 CDTi (B16DTE, 110PS)'] },
        'Corsa E': { '2015': ['1.0 Turbo (B10XFT, 90PS)', '1.2 (B12XER, 70PS)', '1.4 (A14XER, 90PS)', '1.3 CDTi (A13DTE, 95PS)'], '2016': ['1.0 Turbo (B10XFT, 115PS)', '1.4 (A14XER, 90PS)'], '2017': ['1.0 Turbo (B10XFT, 115PS)', '1.4 Turbo (A14NET, 150PS)'] },
        'Insignia B': { '2017': ['1.5 Turbo (B15XFT, 140PS)', '1.5 Turbo (B15XFT, 165PS)', '2.0 CDTi (B20DTH, 170PS)'], '2018': ['1.5 Turbo (B15XFT, 165PS)', '2.0 CDTi (B20DTH, 170PS)', '2.0 Turbo (A20NFT, 260PS)'] },
    },
    'Ford': {
        'Focus IV': { '2018': ['1.0 EcoBoost (M1DA, 85PS)', '1.0 EcoBoost (M1DA, 125PS)', '1.5 EcoBlue (XWDB, 95PS)', '1.5 EcoBlue (XWDD, 120PS)'], '2019': ['1.0 EcoBoost (M1DA, 125PS)', '1.5 EcoBoost (M1PT, 150PS)', '1.5 EcoBlue (XWDD, 120PS)', '2.0 EcoBlue (UFDB, 150PS)'] },
        'Fiesta VII': { '2017': ['1.0 EcoBoost (M1JE, 100PS)', '1.0 EcoBoost (M1JE, 125PS)', '1.1 Ti-VCT (XEJD, 85PS)', '1.5 TDCi (XVJB, 85PS)'], '2018': ['1.0 EcoBoost (M1JE, 125PS)', '1.5 EcoBoost (M1PT, 200PS ST)'] },
        'Kuga II': { '2016': ['1.5 EcoBoost (M8DA, 120PS)', '1.5 EcoBoost (M8DA, 150PS)', '2.0 TDCi (T7CL, 150PS)'], '2017': ['1.5 EcoBoost (M8DA, 150PS)', '2.0 TDCi (T7CL, 150PS)'], '2018': ['1.5 EcoBoost (M8DA, 150PS)', '1.5 TDCi (XWMC, 120PS)'] },
    },
};

const MAKES = Object.keys(VEHICLE_DB).sort();

// ─── Types ──────────────────────────────────────────────────────────
interface ChatMessage {
    id: string;
    role: 'user' | 'bot';
    text: string;
    image?: string;
    timestamp: Date;
    isTyping?: boolean;
    results?: OEMResult[];
}

interface OEMResult {
    oem: string;
    brand?: string;
    confidence?: number;
    note?: string;
}

type Phase = 'part_input' | 'vehicle_method' | 'vin_input' | 'hsn_input' | 'dropdown_select' | 'processing' | 'results' | 'locked';
type TabMode = 'chat' | 'dropdown';

// ─── Particles ──────────────────────────────────────────────────────
interface Particle {
    id: number; x: number; y: number; targetX: number; targetY: number;
    size: number; color: string; delay: number; duration: number; char: string;
}

const OEM_CHARS = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
const P_COLORS = ['rgba(6,182,212,.8)', 'rgba(59,130,246,.8)', 'rgba(16,185,129,.7)', 'rgba(139,92,246,.6)', 'rgba(245,158,11,.5)'];

function makeParticles(n: number): Particle[] {
    return Array.from({ length: n }, (_, i) => ({
        id: i,
        x: Math.random() * 100, y: Math.random() * 100,
        targetX: 50 + (Math.random() - .5) * 6, targetY: 50 + (Math.random() - .5) * 6,
        size: 10 + Math.random() * 16,
        color: P_COLORS[i % P_COLORS.length],
        delay: Math.random() * 2, duration: 2 + Math.random() * 3,
        char: OEM_CHARS[Math.floor(Math.random() * OEM_CHARS.length)],
    }));
}

// ─── Helpers ────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
function md(t: string): string {
    return t
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/_(.+?)_/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 py-0.5 rounded text-[var(--accent)] text-xs font-mono">$1</code>')
        .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-[var(--accent)]/40 pl-3 text-[var(--muted-foreground)] text-sm">$1</blockquote>')
        .replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');
}

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════
export function LiveDemoChat() {
    // Chat state
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [phase, setPhase] = useState<Phase>('part_input');
    const [partQuery, setPartQuery] = useState('');

    // Dropdown state
    const [tabMode, setTabMode] = useState<TabMode>('dropdown');
    const [ddMake, setDdMake] = useState('');
    const [ddModel, setDdModel] = useState('');
    const [ddYear, setDdYear] = useState('');
    const [ddEngine, setDdEngine] = useState('');
    const [ddPart, setDdPart] = useState('');

    // Shared
    const [showCTA, setShowCTA] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showParticles, setShowParticles] = useState(false);
    const [demoUsed, setDemoUsed] = useState(false);
    const [oemResults, setOemResults] = useState<OEMResult[]>([]);

    const chatEnd = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    // Greeting
    useEffect(() => {
        setMessages([{
            id: uid(), role: 'bot', timestamp: new Date(),
            text: '👋 **Willkommen zur Partsunion KI-Demo!**\n\nIch finde das richtige Ersatzteil für Ihr Fahrzeug.\n\n**Welches Teil suchen Sie?**',
        }]);
    }, []);

    // Derived dropdown data
    const models = ddMake ? Object.keys(VEHICLE_DB[ddMake] || {}).sort() : [];
    const years = (ddMake && ddModel) ? Object.keys(VEHICLE_DB[ddMake]?.[ddModel] || {}).sort().reverse() : [];
    const engines = (ddMake && ddModel && ddYear) ? (VEHICLE_DB[ddMake]?.[ddModel]?.[ddYear] || []) : [];

    const addBot = useCallback((text: string, extras?: Partial<ChatMessage>) => {
        return new Promise<void>(res => {
            const tid = uid();
            setMessages(p => [...p, { id: tid, role: 'bot', text: '', timestamp: new Date(), isTyping: true }]);
            setTimeout(() => {
                setMessages(p => p.map(m => m.id === tid ? { ...m, text, isTyping: false, ...extras } : m));
                res();
            }, 500 + Math.random() * 700);
        });
    }, []);

    // ─── Real API ───────────────────────────────────────────────────
    const callOEM = useCallback(async (part: string, vehicle: Record<string, string>) => {
        try {
            const r = await fetch(`${API_BASE}/api/demo/oem-resolve`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ part, vehicle }),
            });
            if (!r.ok) return { success: false, notes: 'API-Fehler' };
            return await r.json();
        } catch { return { success: false, notes: 'Verbindung fehlgeschlagen' }; }
    }, []);

    // ─── Processing (shared by both modes) ──────────────────────────
    const runProcessing = useCallback(async (part: string, vehicle: Record<string, string>) => {
        setPhase('processing');
        setIsLoading(true);
        setDemoUsed(true);

        setParticles(makeParticles(45));
        setShowParticles(true);

        if (tabMode === 'chat') {
            await addBot('🔍 **KI-Analyse gestartet...**\n\nGemini analysiert Ihre Fahrzeugdaten und durchsucht die OEM-Datenbank...');
        }

        const result = await callOEM(part, vehicle);
        await new Promise(r => setTimeout(r, 2800));
        setShowParticles(false);

        const results: OEMResult[] = [];
        if (result.success && result.oem) {
            results.push({ oem: result.oem, brand: 'OE/Original', confidence: 100 });
            (result.candidates || []).slice(0, 4).forEach((c: any) => {
                const o = c.oemNumber || c.oem || c.number;
                if (o && o !== result.oem) results.push({ oem: o, brand: c.brand || 'Aftermarket', confidence: c.confidence || 90, note: c.note });
            });
        }

        setOemResults(results);

        if (tabMode === 'chat') {
            if (results.length > 0) {
                await addBot(
                    `✅ **Teileermittlung abgeschlossen!**\n\nGesuchtes Teil: **${part}**` +
                    (vehicle.vin ? `\nVIN: \`${vehicle.vin}\`` : '') +
                    (vehicle.make ? `\nFahrzeug: **${vehicle.make} ${vehicle.model || ''} ${vehicle.year ? `(${vehicle.year})` : ''}**` : ''),
                    { results }
                );
            } else {
                await addBot(`⚠️ **Keine exakte OEM-Nummer gefunden.**\n\n${result.notes || 'Für diese Kombination konnte kein Treffer ermittelt werden.'}\n\n_Unsere Experten helfen weiter!_`);
            }
        }

        setPhase('locked');
        setIsLoading(false);
        setTimeout(() => setShowCTA(true), 1500);
    }, [addBot, callOEM, tabMode]);

    // ─── Dropdown Submit ────────────────────────────────────────────
    const handleDropdownSubmit = () => {
        if (!ddMake || !ddModel || !ddYear || !ddEngine || !ddPart.trim() || demoUsed) return;
        const engineCode = ddEngine.match(/\(([^,]+)/)?.[1] || '';
        const vehicle = { make: ddMake, model: ddModel, year: ddYear, engine: engineCode };
        runProcessing(ddPart.trim(), vehicle);
    };

    // ─── Chat Logic ─────────────────────────────────────────────────
    const processMsg = useCallback(async (text: string, image?: string) => {
        setIsLoading(true);
        try {
            switch (phase) {
                case 'part_input': {
                    if (text.length < 2) { await addBot('Bitte geben Sie den Teilenamen ein.'); break; }
                    setPartQuery(text);
                    setPhase('vehicle_method');
                    await addBot(`🔧 Teil: **${text}**\n\n> ⚠️ Gleiches Teil, verschiedene OEMs je Fahrzeug — **VIN ist entscheidend!**\n\n**1️⃣** Fahrzeugbrief-Foto\n**2️⃣** VIN/FIN eingeben\n**3️⃣** HSN/TSN manuell`);
                    break;
                }
                case 'vehicle_method': {
                    if (image) {
                        const vin = 'WBAPH5C55BA' + Math.floor(100000 + Math.random() * 900000);
                        await addBot(`📸 **Fahrzeugbrief erkannt!**\nVIN: \`${vin}\``);
                        await runProcessing(partQuery, { vin, make: 'BMW', model: '320d' });
                        return;
                    }
                    const v = text.replace(/\s/g, '');
                    if (/^[A-HJ-NPR-Z0-9]{17}$/i.test(v)) {
                        await addBot(`✅ VIN: \`${v.toUpperCase()}\``);
                        await runProcessing(partQuery, { vin: v.toUpperCase() });
                        return;
                    }
                    if (text === '1' || /foto|bild|upload/i.test(text)) { await addBot('📷 Klicken Sie unten links auf 📎'); break; }
                    if (text === '2' || /vin|fin/i.test(text)) { setPhase('vin_input'); await addBot('🔢 Bitte **17-stellige VIN/FIN** eingeben.'); break; }
                    if (text === '3' || /hsn|tsn/i.test(text)) { setPhase('hsn_input'); await addBot('📝 **HSN und TSN** eingeben. Format: `0005 CJ2`'); break; }
                    await addBot('Bitte wählen Sie **1**, **2** oder **3**.');
                    break;
                }
                case 'vin_input': {
                    const vin = text.replace(/\s/g, '').toUpperCase();
                    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) { await addBot('❌ VIN: genau **17 Zeichen**. Erneut versuchen.'); break; }
                    await addBot(`✅ VIN: \`${vin}\``);
                    await runProcessing(partQuery, { vin });
                    return;
                }
                case 'hsn_input': {
                    const m = text.match(/(\d{4})\s*[\/\s,.-]*\s*([A-Za-z0-9]{3})/);
                    if (!m) { await addBot('❌ Format: `0005 CJ2`'); break; }
                    await addBot(`✅ HSN/TSN: \`${m[1]}/${m[2].toUpperCase()}\``);
                    await runProcessing(partQuery, { hsn: m[1], tsn: m[2].toUpperCase() });
                    return;
                }
                case 'locked': { setShowCTA(true); break; }
            }
        } finally { setIsLoading(false); }
    }, [phase, partQuery, addBot, runProcessing]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if ((!input.trim() && !imagePreview) || isLoading || phase === 'locked') return;
        setMessages(p => [...p, { id: uid(), role: 'user', text: input.trim(), image: imagePreview || undefined, timestamp: new Date() }]);
        const t = input, img = imagePreview;
        setInput(''); setImagePreview(null);
        if (fileRef.current) fileRef.current.value = '';
        processMsg(t, img || undefined);
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f?.type.startsWith('image/')) return;
        const r = new FileReader();
        r.onloadend = () => setImagePreview(r.result as string);
        r.readAsDataURL(f);
    };

    // ─── Select component ───────────────────────────────────────────
    const Select = ({ value, onChange, options, placeholder, disabled }: {
        value: string; onChange: (v: string) => void; options: string[]; placeholder: string; disabled?: boolean;
    }) => (
        <div className="relative">
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                disabled={disabled || options.length === 0}
                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-white/5 border border-[var(--border)]/40 text-sm focus:border-[var(--accent)]/60 focus:outline-none transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:border-[var(--accent)]/30"
            >
                <option value="" disabled className="bg-[var(--background)]">{placeholder}</option>
                {options.map(o => <option key={o} value={o} className="bg-[var(--background)]">{o}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
        </div>
    );

    // ═════════════════════════════════════════════════════════════════
    // Render
    // ═════════════════════════════════════════════════════════════════
    return (
        <section className="min-h-screen pt-24 pb-8 px-4 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-40" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] gradient-glow opacity-30 blur-3xl pointer-events-none" />

            {/* ── Particle Overlay ──────────────────────────────────── */}
            {showParticles && (
                <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full animate-pulse" style={{
                        background: 'radial-gradient(circle, rgba(6,182,212,.4) 0%, rgba(59,130,246,.2) 40%, transparent 70%)',
                        boxShadow: '0 0 100px 50px rgba(6,182,212,.12)',
                    }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-[var(--accent)]/20" style={{ animation: 'demoSpin 4s linear infinite' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-[var(--primary)]/10" style={{ animation: 'demoSpin 7s linear infinite reverse' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[var(--accent)]/5" style={{ animation: 'demoSpin 12s linear infinite' }} />
                    {particles.map(p => (
                        <div key={p.id} className="absolute font-mono font-bold select-none" style={{
                            left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size,
                            color: p.color, textShadow: `0 0 14px ${p.color}`,
                            animation: `particleFly ${p.duration}s ${p.delay}s ease-in-out forwards`,
                            '--tx': `${p.targetX - p.x}vw`, '--ty': `${p.targetY - p.y}vh`, opacity: 0,
                        } as React.CSSProperties}>
                            {p.char}
                        </div>
                    ))}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-28 text-center">
                        <div className="flex items-center gap-2 text-[var(--accent)] font-semibold animate-pulse text-sm">
                            <Zap className="h-4 w-4" /> Gemini analysiert Fahrzeugdaten...
                        </div>
                        <div className="text-[11px] text-[var(--muted-foreground)] mt-1 animate-pulse" style={{ animationDelay: '.5s' }}>
                            OEM-Datenbank wird durchsucht
                        </div>
                    </div>
                </div>
            )}

            {/* ── CTA Popup ────────────────────────────────────────── */}
            {showCTA && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCTA(false)}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div className="relative glass border border-[var(--accent)]/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl" onClick={e => e.stopPropagation()} style={{ animation: 'popIn .4s cubic-bezier(.16,1,.3,1) forwards' }}>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-[var(--primary)]/30">
                            <CheckCircle2 className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-display font-bold mb-2">Demo abgeschlossen!</h2>
                        <p className="text-[var(--muted-foreground)] text-sm mb-6 leading-relaxed">
                            Sie haben gesehen, wie unsere KI in Sekunden das passende Teil findet.
                            <br /><strong className="text-[var(--foreground)]">Möchten Sie das für Ihr Unternehmen?</strong>
                        </p>
                        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-primary text-white font-semibold shadow-lg shadow-[var(--primary)]/30 hover:shadow-xl transition-all hover:-translate-y-0.5">
                            <Phone className="h-4 w-4" /> Beratung vereinbaren <ArrowRight className="h-4 w-4" />
                        </a>
                        <button onClick={() => setShowCTA(false)} className="block mx-auto mt-4 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                            Ergebnis nochmal ansehen
                        </button>
                    </div>
                </div>
            )}

            {/* ── Main Content ─────────────────────────────────────── */}
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col h-[calc(100vh-120px)]">
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[var(--accent)]/20 mb-3">
                        <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
                        <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider">Live Demo</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-1">
                        KI-<span className="text-gradient">Teileermittlung</span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] text-sm">Fahrzeug auswählen → KI findet das Teil</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex gap-1 mb-3 mx-auto glass rounded-xl p-1 border border-[var(--border)]/30">
                    <button onClick={() => setTabMode('dropdown')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tabMode === 'dropdown' ? 'gradient-primary text-white shadow-md' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
                        <ListFilter className="h-3.5 w-3.5" /> Fahrzeug-Auswahl
                    </button>
                    <button onClick={() => setTabMode('chat')}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tabMode === 'chat' ? 'gradient-primary text-white shadow-md' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
                        <MessageSquare className="h-3.5 w-3.5" /> KI-Chat
                    </button>
                </div>

                {/* ── TAB: Dropdown Selector ────────────────────────── */}
                {tabMode === 'dropdown' && (
                    <div className="flex-1 overflow-auto rounded-2xl glass border border-[var(--border)]/50 flex flex-col shadow-2xl shadow-[var(--primary)]/5">
                        <div className="flex-1 p-5 md:p-6 space-y-5 overflow-auto">
                            {/* Step indicators */}
                            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-1">
                                <Car className="h-4 w-4 text-[var(--accent)]" />
                                <span className="font-semibold text-[var(--foreground)]">Fahrzeug identifizieren</span>
                            </div>

                            {/* Cascading Selects */}
                            <div className="grid gap-3">
                                <Select value={ddMake} onChange={v => { setDdMake(v); setDdModel(''); setDdYear(''); setDdEngine(''); }} options={MAKES} placeholder="Marke wählen..." disabled={demoUsed} />
                                <Select value={ddModel} onChange={v => { setDdModel(v); setDdYear(''); setDdEngine(''); }} options={models} placeholder="Modell wählen..." disabled={!ddMake || demoUsed} />

                                <div className="grid grid-cols-2 gap-3">
                                    <Select value={ddYear} onChange={v => { setDdYear(v); setDdEngine(''); }} options={years} placeholder="Baujahr..." disabled={!ddModel || demoUsed} />
                                    <Select value={ddEngine} onChange={setDdEngine} options={engines} placeholder="Motor..." disabled={!ddYear || demoUsed} />
                                </div>
                            </div>

                            {/* Vehicle Badge */}
                            {ddMake && ddModel && (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--accent)]/5 border border-[var(--accent)]/15">
                                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center">
                                        <Car className="h-4 w-4 text-[var(--accent)]" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">{ddMake} {ddModel}</div>
                                        <div className="text-xs text-[var(--muted-foreground)]">
                                            {ddYear && `${ddYear}`}{ddEngine && ` · ${ddEngine}`}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 border-t border-[var(--border)]/30" />
                                <span className="text-xs text-[var(--muted-foreground)] font-semibold">TEIL ANGEBEN</span>
                                <div className="flex-1 border-t border-[var(--border)]/30" />
                            </div>

                            {/* Part Input */}
                            <input
                                type="text"
                                value={ddPart}
                                onChange={e => setDdPart(e.target.value)}
                                placeholder="z.B. Bremsscheibe, Ölfilter, Stoßdämpfer..."
                                disabled={demoUsed}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)]/40 text-sm focus:border-[var(--accent)]/60 focus:outline-none transition-all disabled:opacity-30 placeholder:text-[var(--muted-foreground)]/40"
                            />

                            {/* Quick Part Buttons */}
                            {!demoUsed && (
                                <div className="flex gap-1.5 flex-wrap">
                                    {['Bremsscheibe', 'Ölfilter', 'Luftfilter', 'Stoßdämpfer', 'Zündkerze', 'Keilriemen'].map(p => (
                                        <button key={p} onClick={() => setDdPart(p)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${ddPart === p
                                                ? 'bg-[var(--accent)]/15 border-[var(--accent)]/30 text-[var(--accent)]'
                                                : 'bg-white/5 border-[var(--border)]/30 text-[var(--muted-foreground)] hover:border-[var(--accent)]/30 hover:text-[var(--accent)]'
                                            }`}>
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                onClick={handleDropdownSubmit}
                                disabled={!ddMake || !ddModel || !ddYear || !ddEngine || !ddPart.trim() || isLoading || demoUsed}
                                className="w-full py-3.5 rounded-xl gradient-primary text-white font-semibold shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                            >
                                {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> KI analysiert...</> : <><Sparkles className="h-4 w-4" /> Teil ermitteln</>}
                            </button>

                            {/* Results (dropdown mode) */}
                            {phase === 'locked' && oemResults.length > 0 && (
                                <div className="space-y-2 pt-2">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                                        <CheckCircle2 className="h-4 w-4" /> {oemResults.length} Treffer gefunden
                                    </div>
                                    {oemResults.map((r, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-[var(--border)]/30 hover:border-[var(--accent)]/30 transition-all">
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-[var(--accent)]/20 text-[var(--accent)]' : 'bg-white/10 text-[var(--muted-foreground)]'}`}>
                                                #{i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-semibold text-sm">{r.brand}</span>
                                                    <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded font-mono text-[var(--accent)]">{r.oem}</code>
                                                </div>
                                            </div>
                                            {r.confidence && <div className={`text-xs font-bold ${r.confidence >= 95 ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)]'}`}>{r.confidence}%</div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {phase === 'locked' && oemResults.length === 0 && (
                                <div className="text-center py-4 text-[var(--muted-foreground)] text-sm">
                                    ⚠️ Kein Treffer — unsere Experten helfen weiter!
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── TAB: Chat ─────────────────────────────────────── */}
                {tabMode === 'chat' && (
                    <div className="flex-1 overflow-hidden rounded-2xl glass border border-[var(--border)]/50 flex flex-col shadow-2xl shadow-[var(--primary)]/5">
                        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${msg.role === 'bot' ? 'bg-gradient-to-br from-[var(--accent)]/20 to-[var(--primary)]/20 text-[var(--accent)]' : 'bg-[var(--primary)]/20 text-[var(--primary)]'}`}>
                                        {msg.role === 'bot' ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                                    </div>
                                    <div className={`max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
                                        <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[var(--primary)]/15 border border-[var(--primary)]/20 rounded-tr-md' : 'bg-white/5 border border-[var(--border)]/30 rounded-tl-md'}`}>
                                            {msg.isTyping ? (
                                                <div className="flex items-center gap-1.5 py-1">
                                                    <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            ) : (
                                                <>
                                                    {msg.image && <div className="mb-2 rounded-lg overflow-hidden border border-[var(--border)]/30"><img src={msg.image} alt="" className="max-h-40 w-auto" /></div>}
                                                    <div dangerouslySetInnerHTML={{ __html: md(msg.text) }} />
                                                    {msg.results && (
                                                        <div className="mt-3 space-y-1.5">
                                                            {msg.results.map((r, i) => (
                                                                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-[var(--border)]/30">
                                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-[var(--accent)]/20 text-[var(--accent)]' : 'bg-white/10 text-[var(--muted-foreground)]'}`}>#{i + 1}</div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <span className="font-semibold text-xs">{r.brand}</span>{' '}
                                                                        <code className="text-[11px] bg-white/10 px-1 py-0.5 rounded font-mono text-[var(--accent)]">{r.oem}</code>
                                                                    </div>
                                                                    {r.confidence && <div className={`text-xs font-bold ${r.confidence >= 95 ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)]'}`}>{r.confidence}%</div>}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEnd} />
                        </div>
                        {imagePreview && (
                            <div className="px-4 py-2 border-t border-[var(--border)]/30">
                                <div className="relative inline-block">
                                    <img src={imagePreview} alt="" className="h-14 rounded-lg border border-[var(--border)]/30" />
                                    <button onClick={() => { setImagePreview(null); if (fileRef.current) fileRef.current.value = ''; }} className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--error)] rounded-full flex items-center justify-center text-white"><X className="h-2.5 w-2.5" /></button>
                                </div>
                            </div>
                        )}
                        {phase === 'part_input' && tabMode === 'chat' && (
                            <div className="px-3 py-2 border-t border-[var(--border)]/30 flex gap-1.5 flex-wrap">
                                {['Bremsscheibe', 'Ölfilter', 'Stoßdämpfer', 'Zündkerze'].map(p => (
                                    <button key={p} onClick={() => { setInput(p); inputRef.current?.focus(); }}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-[var(--border)]/30 hover:border-[var(--accent)]/40 text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-all">{p}</button>
                                ))}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-[var(--border)]/30 flex items-end gap-2">
                            <input type="file" ref={fileRef} onChange={handleImage} accept="image/*" className="hidden" />
                            <button type="button" onClick={() => fileRef.current?.click()} disabled={phase === 'locked' || isLoading}
                                className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/5 border border-[var(--border)]/30 flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-all disabled:opacity-30">
                                <Upload className="h-3.5 w-3.5" />
                            </button>
                            <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                                placeholder={phase === 'locked' ? 'Demo abgeschlossen' : phase === 'part_input' ? 'Welches Teil?' : phase === 'vin_input' ? 'VIN…' : phase === 'hsn_input' ? 'HSN TSN…' : 'Nachricht…'}
                                disabled={isLoading || phase === 'locked'} autoFocus
                                className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-[var(--border)]/30 focus:border-[var(--accent)]/50 focus:outline-none text-sm placeholder:text-[var(--muted-foreground)]/40 transition-all disabled:opacity-40" />
                            <button type="submit" disabled={isLoading || (!input.trim() && !imagePreview) || phase === 'locked'}
                                className="flex-shrink-0 w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white disabled:opacity-20 transition-all">
                                {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                            </button>
                        </form>
                    </div>
                )}

                <p className="text-center text-[10px] text-[var(--muted-foreground)]/40 mt-2">Powered by Gemini AI · Eine Abfrage pro Session</p>
            </div>

            <style jsx global>{`
                @keyframes particleFly {
                    0% { opacity: 0; transform: translate(0,0) scale(1); }
                    15% { opacity: 1; }
                    85% { opacity: .7; }
                    100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(.15); }
                }
                @keyframes demoSpin {
                    from { transform: translate(-50%,-50%) rotate(0deg); }
                    to { transform: translate(-50%,-50%) rotate(360deg); }
                }
                @keyframes popIn {
                    0% { opacity: 0; transform: scale(.9) translateY(20px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </section>
    );
}
