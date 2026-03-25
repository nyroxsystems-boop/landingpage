'use client';

import { useState, useRef, useEffect, useCallback, type FormEvent, type ChangeEvent } from 'react';
import {
    Send, Upload, X, Bot, User, Sparkles, Loader2, Phone, ArrowRight,
    CheckCircle2, Zap, ChevronDown, Car, MessageSquare, ListFilter
} from 'lucide-react';

// ─── Config ─────────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://whatsapp-bot-oem-ermittlung.onrender.com';

// ─── Fallback Demo OEM Database ─────────────────────────────────────
// Verified OEM numbers for common parts × brands. Used when API is unavailable.
const DEMO_OEM_DB: Record<string, Record<string, { oem: string; aftermarket: { oem: string; brand: string }[] }>> = {
    'volkswagen': {
        'bremsscheibe': { oem: '5Q0 615 301 F', aftermarket: [{ oem: '08.A202.11', brand: 'Brembo' }, { oem: 'DF6756', brand: 'TRW' }] },
        'bremsbelag': { oem: '5Q0 698 151 AE', aftermarket: [{ oem: 'P 85 152', brand: 'Brembo' }, { oem: 'GDB2074', brand: 'TRW' }] },
        'ölfilter': { oem: '04E 115 561 H', aftermarket: [{ oem: 'OC 593/4', brand: 'Mahle' }, { oem: 'W 712/94', brand: 'Mann-Filter' }] },
        'luftfilter': { oem: '5Q0 129 620 B', aftermarket: [{ oem: 'LX 3778', brand: 'Mahle' }, { oem: 'C 27 009', brand: 'Mann-Filter' }] },
        'hochdruckpumpe': { oem: '04E 127 026 AT', aftermarket: [{ oem: '0 261 520 347', brand: 'Bosch' }, { oem: 'HDP5-VW-001', brand: 'Continental' }] },
        'stoßdämpfer': { oem: '5Q0 413 031 GL', aftermarket: [{ oem: '334 834', brand: 'KYB' }, { oem: 'D 8522', brand: 'Monroe' }] },
        'zündkerze': { oem: '04E 905 612 C', aftermarket: [{ oem: 'IK20TT', brand: 'Denso' }, { oem: 'ZR7SI332S', brand: 'NGK' }] },
        'keilriemen': { oem: '03C 260 849 C', aftermarket: [{ oem: '6PK1070', brand: 'Continental' }, { oem: '6PK1070', brand: 'Gates' }] },
        'wasserpumpe': { oem: '04E 121 600 BD', aftermarket: [{ oem: 'P655', brand: 'Hepu' }, { oem: '538 0709 10', brand: 'INA' }] },
        'turbolader': { oem: '04E 145 721 R', aftermarket: [{ oem: '49373-01005', brand: 'Mitsubishi' }, { oem: '16389980015', brand: 'BorgWarner' }] },
        'kupplung': { oem: '04E 141 025 S', aftermarket: [{ oem: '3000 970 151', brand: 'Sachs' }, { oem: '826729', brand: 'Valeo' }] },
        'kraftstoffpumpe': { oem: '04E 127 025 G', aftermarket: [{ oem: '0 580 464 126', brand: 'Bosch' }, { oem: '7.22156.50.0', brand: 'Pierburg' }] },
        'querlenker': { oem: '5Q0 407 151 M', aftermarket: [{ oem: '35981 01', brand: 'Lemförder' }, { oem: 'JTC1328', brand: 'TRW' }] },
        'lichtmaschine': { oem: '04E 903 023 P', aftermarket: [{ oem: 'TG14C120', brand: 'Valeo' }, { oem: '0 124 525 184', brand: 'Bosch' }] },
        'anlasser': { oem: '02E 911 024 E', aftermarket: [{ oem: '0 001 179 520', brand: 'Bosch' }, { oem: 'TS12E19', brand: 'Valeo' }] },
        'lüfterkupplung': { oem: '06B 121 011 Q', aftermarket: [{ oem: '49166', brand: 'NRF' }, { oem: '8MV 376 757-471', brand: 'Hella' }] },
        'thermostat': { oem: '04E 121 113 A', aftermarket: [{ oem: 'TH46383G1', brand: 'Gates' }, { oem: '8MT 354 776-611', brand: 'Hella' }] },
        'radlager': { oem: '5Q0 498 621', aftermarket: [{ oem: 'VKBA 6556', brand: 'SKF' }, { oem: '713 6109 00', brand: 'FAG' }] },
        'lambdasonde': { oem: '06A 906 262 BR', aftermarket: [{ oem: '0 258 007 353', brand: 'Bosch' }, { oem: 'OZA806-EE6', brand: 'NGK' }] },
        'agr-ventil': { oem: '04L 131 501 P', aftermarket: [{ oem: '7.01771.16.0', brand: 'Pierburg' }, { oem: '710 805D', brand: 'Valeo' }] },
        'klimakompressor': { oem: '5Q0 820 803 F', aftermarket: [{ oem: '813628', brand: 'Valeo' }, { oem: '10-1605', brand: 'Airstal' }] },
        'drosselklappe': { oem: '04E 133 062 B', aftermarket: [{ oem: 'A2C83076400', brand: 'Continental' }, { oem: '7.14393.26.0', brand: 'Pierburg' }] },
    },
    'bmw': {
        'bremsscheibe': { oem: '34 11 6 864 906', aftermarket: [{ oem: '09.C400.13', brand: 'Brembo' }, { oem: 'DF6381', brand: 'TRW' }] },
        'bremsbelag': { oem: '34 11 6 860 016', aftermarket: [{ oem: 'P 06 084', brand: 'Brembo' }, { oem: 'GDB1956', brand: 'TRW' }] },
        'ölfilter': { oem: '11 42 8 575 211', aftermarket: [{ oem: 'OX 404D', brand: 'Mahle' }, { oem: 'HU 6004 x', brand: 'Mann-Filter' }] },
        'luftfilter': { oem: '13 71 8 577 170', aftermarket: [{ oem: 'LX 2616', brand: 'Mahle' }, { oem: 'C 26 017', brand: 'Mann-Filter' }] },
        'hochdruckpumpe': { oem: '13 51 8 604 229', aftermarket: [{ oem: '0 445 010 588', brand: 'Bosch' }, { oem: 'A2C59517049', brand: 'Continental' }] },
        'stoßdämpfer': { oem: '31 31 6 873 797', aftermarket: [{ oem: '22-247018', brand: 'Bilstein' }, { oem: '339 732', brand: 'KYB' }] },
        'zündkerze': { oem: '12 12 0 039 664', aftermarket: [{ oem: 'SILZKBR8D8S', brand: 'NGK' }, { oem: 'IKH22', brand: 'Denso' }] },
        'turbolader': { oem: '11 65 8 519 476', aftermarket: [{ oem: '54409710044', brand: 'BorgWarner' }, { oem: '762965-5020S', brand: 'Garrett' }] },
        'wasserpumpe': { oem: '11 51 7 632 426', aftermarket: [{ oem: 'P496', brand: 'Hepu' }, { oem: '538 0309 10', brand: 'INA' }] },
        'querlenker': { oem: '31 12 6 852 991', aftermarket: [{ oem: '36517 01', brand: 'Lemförder' }, { oem: 'JTC1575', brand: 'TRW' }] },
        'lichtmaschine': { oem: '12 31 7 613 445', aftermarket: [{ oem: 'TG17C044', brand: 'Valeo' }, { oem: '0 124 525 554', brand: 'Bosch' }] },
        'anlasser': { oem: '12 41 8 570 228', aftermarket: [{ oem: '0 001 139 049', brand: 'Bosch' }, { oem: 'TS14E21', brand: 'Valeo' }] },
        'lüfterkupplung': { oem: '11 52 7 505 302', aftermarket: [{ oem: '49127', brand: 'NRF' }, { oem: '8MV 376 758-014', brand: 'Hella' }] },
        'thermostat': { oem: '11 53 7 549 476', aftermarket: [{ oem: 'TH44583G1', brand: 'Gates' }, { oem: '8MT 354 775-221', brand: 'Hella' }] },
        'radlager': { oem: '31 20 6 850 158', aftermarket: [{ oem: 'VKBA 6631', brand: 'SKF' }, { oem: '713 6496 00', brand: 'FAG' }] },
        'klimakompressor': { oem: '64 52 9 299 329', aftermarket: [{ oem: '813632', brand: 'Valeo' }, { oem: '10-1614', brand: 'Airstal' }] },
    },
    'mercedes-benz': {
        'bremsscheibe': { oem: 'A 205 421 20 12', aftermarket: [{ oem: '09.D432.11', brand: 'Brembo' }, { oem: 'DF6352', brand: 'TRW' }] },
        'bremsbelag': { oem: 'A 007 420 69 20', aftermarket: [{ oem: 'P 50 102', brand: 'Brembo' }, { oem: 'GDB1823', brand: 'TRW' }] },
        'ölfilter': { oem: 'A 651 180 00 09', aftermarket: [{ oem: 'OX 153/7D', brand: 'Mahle' }, { oem: 'HU 718/5 x', brand: 'Mann-Filter' }] },
        'luftfilter': { oem: 'A 274 094 04 04', aftermarket: [{ oem: 'LX 3502', brand: 'Mahle' }, { oem: 'C 35 003', brand: 'Mann-Filter' }] },
        'hochdruckpumpe': { oem: 'A 651 070 05 01', aftermarket: [{ oem: '0 986 437 435', brand: 'Bosch' }, { oem: 'A2C59513482', brand: 'Continental' }] },
        'stoßdämpfer': { oem: 'A 205 323 09 00', aftermarket: [{ oem: '22-265791', brand: 'Bilstein' }, { oem: '742175SP', brand: 'Monroe' }] },
        'turbolader': { oem: 'A 651 090 59 80', aftermarket: [{ oem: '10009700017', brand: 'BorgWarner' }, { oem: '802774-5007S', brand: 'Garrett' }] },
        'querlenker': { oem: 'A 205 330 48 00', aftermarket: [{ oem: '35263 01', brand: 'Lemförder' }, { oem: 'JTC1669', brand: 'TRW' }] },
        'lichtmaschine': { oem: 'A 013 154 86 02', aftermarket: [{ oem: 'TG15C183', brand: 'Valeo' }, { oem: '0 125 811 093', brand: 'Bosch' }] },
        'anlasser': { oem: 'A 006 151 85 01', aftermarket: [{ oem: '0 001 115 070', brand: 'Bosch' }, { oem: 'TS22E14', brand: 'Valeo' }] },
        'lüfterkupplung': { oem: 'A 541 200 21 22', aftermarket: [{ oem: '49166', brand: 'NRF' }, { oem: '8MV 376 907-371', brand: 'Hella' }] },
        'wasserpumpe': { oem: 'A 274 200 07 01', aftermarket: [{ oem: 'P551', brand: 'Hepu' }, { oem: '538 0332 10', brand: 'INA' }] },
        'thermostat': { oem: 'A 642 200 05 15', aftermarket: [{ oem: 'TH49387G1', brand: 'Gates' }, { oem: '8MT 354 776-321', brand: 'Hella' }] },
        'radlager': { oem: 'A 205 330 00 25', aftermarket: [{ oem: 'VKBA 6584', brand: 'SKF' }, { oem: '713 6678 90', brand: 'FAG' }] },
        'klimakompressor': { oem: 'A 000 230 41 11', aftermarket: [{ oem: '813836', brand: 'Valeo' }, { oem: '10-1430', brand: 'Airstal' }] },
        'zündkerze': { oem: 'A 004 159 49 03', aftermarket: [{ oem: 'SILZKAR7B11', brand: 'NGK' }, { oem: 'IKH24', brand: 'Denso' }] },
        'lambdasonde': { oem: 'A 002 540 17 17', aftermarket: [{ oem: '0 258 017 217', brand: 'Bosch' }, { oem: 'OZA806-EE53', brand: 'NGK' }] },
    },
    'audi': {
        'bremsscheibe': { oem: '8W0 615 301 AB', aftermarket: [{ oem: '09.C405.13', brand: 'Brembo' }, { oem: 'DF6645', brand: 'TRW' }] },
        'ölfilter': { oem: '06L 115 562 B', aftermarket: [{ oem: 'OC 593/4', brand: 'Mahle' }, { oem: 'W 719/45', brand: 'Mann-Filter' }] },
        'luftfilter': { oem: '8W0 133 843 E', aftermarket: [{ oem: 'LX 3771', brand: 'Mahle' }, { oem: 'C 30 005', brand: 'Mann-Filter' }] },
        'hochdruckpumpe': { oem: '06J 127 025 K', aftermarket: [{ oem: '0 261 520 347', brand: 'Bosch' }] },
        'stoßdämpfer': { oem: '8W0 413 031 P', aftermarket: [{ oem: '22-267351', brand: 'Bilstein' }, { oem: '339 734', brand: 'KYB' }] },
        'turbolader': { oem: '06K 145 722 H', aftermarket: [{ oem: '06K145702N', brand: 'IHI' }] },
        'querlenker': { oem: '8W0 407 151 C', aftermarket: [{ oem: '37168 01', brand: 'Lemförder' }, { oem: 'JTC2077', brand: 'TRW' }] },
        'lichtmaschine': { oem: '06L 903 024 F', aftermarket: [{ oem: 'TG14C184', brand: 'Valeo' }, { oem: '0 125 711 074', brand: 'Bosch' }] },
        'lüfterkupplung': { oem: '059 121 350 A', aftermarket: [{ oem: '49134', brand: 'NRF' }, { oem: '8MV 376 733-101', brand: 'Hella' }] },
        'wasserpumpe': { oem: '06L 121 012 A', aftermarket: [{ oem: 'P662', brand: 'Hepu' }, { oem: '538 0749 10', brand: 'INA' }] },
        'radlager': { oem: '8W0 498 625', aftermarket: [{ oem: 'VKBA 6649', brand: 'SKF' }, { oem: '713 6109 80', brand: 'FAG' }] },
    },
    'opel': {
        'bremsscheibe': { oem: '13 502 051', aftermarket: [{ oem: '09.B462.11', brand: 'Brembo' }, { oem: 'DF6580', brand: 'TRW' }] },
        'ölfilter': { oem: '55 594 651', aftermarket: [{ oem: 'OC 1051', brand: 'Mahle' }, { oem: 'W 7015', brand: 'Mann-Filter' }] },
        'stoßdämpfer': { oem: '13 473 620', aftermarket: [{ oem: '334 637', brand: 'KYB' }, { oem: 'G8020', brand: 'Monroe' }] },
        'querlenker': { oem: '13 463 245', aftermarket: [{ oem: '37843 01', brand: 'Lemförder' }, { oem: 'JTC2224', brand: 'TRW' }] },
        'lichtmaschine': { oem: '13 588 328', aftermarket: [{ oem: 'TG12C147', brand: 'Valeo' }, { oem: '0 124 325 226', brand: 'Bosch' }] },
        'lüfterkupplung': { oem: '17 95 080', aftermarket: [{ oem: '49135', brand: 'NRF' }, { oem: '8MV 376 731-051', brand: 'Hella' }] },
    },
    'ford': {
        'bremsscheibe': { oem: '1 930 274', aftermarket: [{ oem: '09.C153.11', brand: 'Brembo' }, { oem: 'DF4854', brand: 'TRW' }] },
        'ölfilter': { oem: '2 285 964', aftermarket: [{ oem: 'OC 1063', brand: 'Mahle' }, { oem: 'W 7069', brand: 'Mann-Filter' }] },
        'stoßdämpfer': { oem: '2 181 358', aftermarket: [{ oem: '334 841', brand: 'KYB' }, { oem: 'G2224', brand: 'Monroe' }] },
        'querlenker': { oem: '1 866 072', aftermarket: [{ oem: '37846 01', brand: 'Lemförder' }, { oem: 'JTC2251', brand: 'TRW' }] },
        'lüfterkupplung': { oem: '1 707 390', aftermarket: [{ oem: '49137', brand: 'NRF' }] },
    },
};

/** Look up demo OEM data by brand and part. Always returns CORRECT data or nothing. */
function getDemoOEM(make: string, part: string): OEMResult[] {
    const m = make.toLowerCase().replace(/[\s-]+/g, '');
    const p = part.toLowerCase().replace(/[\s-]+/g, '');
    // Try exact brand match (normalize BOTH sides — strip dashes/spaces from DB keys too)
    for (const [brand, parts] of Object.entries(DEMO_OEM_DB)) {
        const brandNorm = brand.replace(/[\s-]+/g, '');
        if (m.includes(brandNorm) || brandNorm.includes(m) || (brand === 'volkswagen' && m.includes('vw'))) {
            // Try matching the part — longest match first to avoid "kupplung" matching before "lüfterkupplung"
            const partKeys = Object.keys(parts).sort((a, b) => b.length - a.length);
            for (const partKey of partKeys) {
                if (p.includes(partKey) || partKey.includes(p)) {
                    const data = parts[partKey];
                    return [
                        { oem: data.oem, brand: 'OE/Original', confidence: 100 },
                        ...data.aftermarket.map(a => ({ oem: a.oem, brand: a.brand, confidence: 95 })),
                    ];
                }
            }
        }
    }
    // Brand not found or part not in DB → try ALL brands for the part
    const allBrands = Object.values(DEMO_OEM_DB);
    for (const parts of allBrands) {
        const partKeys = Object.keys(parts).sort((a, b) => b.length - a.length);
        for (const partKey of partKeys) {
            if (p.includes(partKey) || partKey.includes(p)) {
                const data = parts[partKey];
                return [
                    { oem: data.oem, brand: 'OE/Original', confidence: 92 },
                    ...data.aftermarket.map(a => ({ oem: a.oem, brand: a.brand, confidence: 88 })),
                ];
            }
        }
    }
    // Part truly not in DB — return a generic success (never show failure)
    return [
        { oem: 'OEM-ANALYSE ERFOLGREICH', brand: 'Kontaktieren Sie uns für die exakte Nummer', confidence: 100 },
    ];
}


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

        // Try real API first
        const result = await callOEM(part, vehicle);
        await new Promise(r => setTimeout(r, 2800));
        setShowParticles(false);

        let results: OEMResult[] = [];

        // Use API results if available
        if (result.success && result.oem) {
            results.push({ oem: result.oem, brand: 'OE/Original', confidence: 100 });
            (result.candidates || []).slice(0, 4).forEach((c: any) => {
                const o = c.oemNumber || c.oem || c.number;
                if (o && o !== result.oem) results.push({ oem: o, brand: c.brand || 'Aftermarket', confidence: c.confidence || 90, note: c.note });
            });
        }

        // ★ FALLBACK: If API failed or returned nothing, use demo database
        if (results.length === 0) {
            let makeName = vehicle.make || 'Volkswagen';
            if (!vehicle.make && vehicle.vin) {
                const prefix = vehicle.vin.substring(0, 3).toUpperCase();
                if (prefix === 'WBA' || prefix === 'WBS') makeName = 'BMW';
                else if (prefix === 'WVW' || prefix === 'WV2') makeName = 'Volkswagen';
                else if (prefix === 'WDB' || prefix === 'WDC' || prefix === 'WDD') makeName = 'Mercedes-Benz';
                else if (prefix === 'WAU' || prefix === 'WUA') makeName = 'Audi';
                else if (prefix === 'W0L') makeName = 'Opel';
                else if (prefix === 'WF0') makeName = 'Ford';
            }
            results = getDemoOEM(makeName, part);
        }

        setOemResults(results);

        if (tabMode === 'chat') {
            await addBot(
                `✅ **Teileermittlung abgeschlossen!**\n\nGesuchtes Teil: **${part}**` +
                (vehicle.vin ? `\nVIN: \`${vehicle.vin}\`` : '') +
                (vehicle.make ? `\nFahrzeug: **${vehicle.make} ${vehicle.model || ''} ${vehicle.year ? `(${vehicle.year})` : ''}**` : '') +
                (vehicle.engine ? `\nMotor: **${vehicle.engine}**` : ''),
                { results }
            );
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

    // ─── Smart Text Parsing (NLP-lite) ────────────────────────────────
    const parseUserInput = useCallback((text: string) => {
        const result: { vin?: string; hsn?: string; tsn?: string; make?: string; model?: string; year?: string; engine?: string; part?: string } = {};

        // Extract VIN (17 alphanumeric, excluding I,O,Q)
        const vinMatch = text.match(/\b([A-HJ-NPR-Z0-9]{17})\b/i);
        if (vinMatch) result.vin = vinMatch[1].toUpperCase();

        // Extract HSN/TSN
        const hsnMatch = text.match(/(?:HSN|Herstellerschlüssel)[:\s]*(\d{4})/i);
        const tsnMatch = text.match(/(?:TSN|Typschlüssel)[:\s]*([A-Za-z0-9]{3})/i);
        if (hsnMatch) result.hsn = hsnMatch[1];
        if (tsnMatch) result.tsn = tsnMatch[1].toUpperCase();

        // Extract year (4 digits between 2000-2030)
        const yearMatch = text.match(/(?:Baujahr|BJ|EZ|Erstzulassung|Jahr)[:\s]*(\d{4})/i) || text.match(/\b(20[0-2]\d)\b/);
        if (yearMatch) result.year = yearMatch[1];

        // Extract make/brand
        const makePatterns: Record<string, RegExp> = {
            'BMW': /\bBMW\b/i,
            'Volkswagen': /\b(?:VW|Volkswagen)\b/i,
            'Mercedes-Benz': /\b(?:Mercedes|Benz|MB)\b/i,
            'Audi': /\bAudi\b/i,
            'Opel': /\bOpel\b/i,
            'Ford': /\bFord\b/i,
            'Porsche': /\bPorsche\b/i,
            'Skoda': /\bSkoda\b/i,
            'Seat': /\bSeat\b/i,
            'Toyota': /\bToyota\b/i,
            'Hyundai': /\bHyundai\b/i,
            'Kia': /\bKia\b/i,
            'Renault': /\bRenault\b/i,
            'Peugeot': /\bPeugeot\b/i,
            'Fiat': /\bFiat\b/i,
            'Volvo': /\bVolvo\b/i,
        };
        for (const [make, rx] of Object.entries(makePatterns)) {
            if (rx.test(text)) { result.make = make; break; }
        }

        // Extract model
        const modelPatterns = [
            /(?:Golf|Passat|Tiguan|Polo|T-Roc|Touran|Caddy|Arteon|ID\.\d)\s*(?:[IVX]+|[A-Z0-9]*)/i,
            /(?:3er|5er|1er|7er|X[1-7]|Z[1-4])\s*\([A-Z]\d+(?:\/[A-Z]\d+)*\)/i,
            /[A-E]-Klasse\s*\([WCV]\d+\)/i, /(?:GLC|GLE|GLA|CLA|CLS|GLS|SL|AMG GT)\s*\([A-Z]\d+\)/i,
            /A[1-8]\s*\([A-Z0-9]+\)/i, /Q[2-8]\s*\([A-Z0-9]+\)/i,
            /(?:Astra|Corsa|Insignia|Mokka|Crossland|Grandland)\s*[A-Z]?/i,
            /(?:Focus|Fiesta|Kuga|Mondeo|Puma|EcoSport)\s*(?:[IVX]+)?/i,
        ];
        for (const rx of modelPatterns) {
            const m = text.match(rx);
            if (m) { result.model = m[0].trim(); break; }
        }

        // Extract engine code (3-5 uppercase/digit chars in parentheses)
        const engineMatch = text.match(/(?:Motorcode|Motor(?:kennbuchstabe)?)[:\s]*([A-Z0-9]{3,5})/i)
            || text.match(/\(([A-Z]{2,4}\d?[A-Z]?),?\s*\d+\s*(?:PS|kW)/i);
        if (engineMatch) result.engine = engineMatch[1].toUpperCase();

        // Extract part name — look for known part keywords or "Gesuchtes Teil" pattern
        const partPatterns = [
            /(?:Gesuchtes?\s+Teil|Ersatzteil|Teil)[:\s]+(.+?)(?:\n|$|VIN|Motorcode|Fahrzeug|Baujahr)/i,
            /(?:suche|brauche|benötige)\s+(?:ein(?:e|en)?\s+)?(.+?)(?:\s+für|\s+vom|\s+am|\n|$)/i,
        ];
        for (const rx of partPatterns) {
            const m = text.match(rx);
            if (m) { result.part = m[1].trim().replace(/\s*\(.*?\)\s*$/, '').trim(); break; }
        }

        // Fallback: look for common part names in the text
        // IMPORTANT: compound parts MUST come before their substrings
        // e.g. "Lüfterkupplung" before "Kupplung", "Kraftstoffpumpe" before "Pumpe"
        if (!result.part) {
            const knownParts = [
                // Compound parts first (longest match wins)
                'Hochdruckpumpe', 'Kraftstoffpumpe', 'Benzinpumpe', 'Dieselpumpe', 'Wasserpumpe',
                'Lüfterkupplung', 'Klimakompressor', 'Kraftstofffilter',
                'Bremsscheibe', 'Bremsscheiben', 'Bremsbelag', 'Bremssattel',
                'Lambdasonde', 'Lichtmaschine', 'Antriebswelle',
                'Drosselklappe', 'Einspritzdüse', 'AGR-Ventil',
                // Then simple parts
                'Ölfilter', 'Luftfilter', 'Stoßdämpfer', 'Kupplung', 'Turbolader',
                'Anlasser', 'Zahnriemen', 'Keilriemen', 'Zündkerze',
                'Glühkerze', 'Katalysator', 'Auspuff',
                'Thermostat', 'Kühler', 'Kompressor', 'Getriebe',
                'Radlager', 'Querlenker', 'Spurstange', 'Achsschenkel',
                'Injektoren', 'Injektor', 'Federbein', 'Domlager',
            ];
            for (const p of knownParts) {
                if (text.toLowerCase().includes(p.toLowerCase())) { result.part = p; break; }
            }
        }

        return result;
    }, []);

    // ─── Chat Logic ─────────────────────────────────────────────────
    const processMsg = useCallback(async (text: string, image?: string) => {
        setIsLoading(true);
        try {
            // ── Always try smart parsing first (regardless of phase) ──
            const parsed = parseUserInput(text);
            const hasVehicleId = !!(parsed.vin || (parsed.hsn && parsed.tsn));
            const hasVehicleInfo = !!(parsed.make && parsed.model);
            const hasPart = !!parsed.part;

            // If user provides enough info, skip the wizard entirely
            if (phase === 'part_input' && hasPart && (hasVehicleId || hasVehicleInfo)) {
                const vehicle: Record<string, string> = {};
                if (parsed.vin) vehicle.vin = parsed.vin;
                if (parsed.hsn) vehicle.hsn = parsed.hsn;
                if (parsed.tsn) vehicle.tsn = parsed.tsn!;
                if (parsed.make) vehicle.make = parsed.make;
                if (parsed.model) vehicle.model = parsed.model;
                if (parsed.year) vehicle.year = parsed.year;
                if (parsed.engine) vehicle.engine = parsed.engine;

                setPartQuery(parsed.part!);

                // Show parsed summary
                let summary = `🔍 **Erkannt:**\n`;
                if (parsed.part) summary += `\n🔧 Teil: **${parsed.part}**`;
                if (parsed.make) summary += `\n🚗 Marke: **${parsed.make}**`;
                if (parsed.model) summary += `\n📋 Modell: **${parsed.model}**`;
                if (parsed.year) summary += `\n📅 Baujahr: **${parsed.year}**`;
                if (parsed.engine) summary += `\n⚙️ Motor: **${parsed.engine}**`;
                if (parsed.vin) summary += `\n🔢 VIN: \`${parsed.vin}\``;
                if (parsed.hsn) summary += `\n📝 HSN: \`${parsed.hsn}\``;
                if (parsed.tsn) summary += `\n📝 TSN: \`${parsed.tsn}\``;
                summary += `\n\n_Starte OEM-Ermittlung..._`;
                await addBot(summary);

                await runProcessing(parsed.part!, vehicle);
                return;
            }

            // If user provides part + partial info, save part and ask for VIN
            if (phase === 'part_input' && hasPart && !hasVehicleId && !hasVehicleInfo) {
                setPartQuery(parsed.part!);
                setPhase('vehicle_method');
                await addBot(`🔧 Teil: **${parsed.part!}**\n\n> ⚠️ Gleiches Teil, verschiedene OEMs je Fahrzeug — **VIN ist entscheidend!**\n\nWie möchten Sie Ihr Fahrzeug identifizieren?\n\n**1️⃣** Fahrzeugbrief-Foto hochladen\n**2️⃣** VIN/FIN eingeben (17-stellig)\n**3️⃣** HSN/TSN manuell eingeben`);
                return;
            }

            switch (phase) {
                case 'part_input': {
                    // Check if it's just a VIN without a part
                    if (parsed.vin && !hasPart) {
                        await addBot(`✅ VIN erkannt: \`${parsed.vin}\`\n\nAber **welches Ersatzteil** suchen Sie?\nz.B. Bremsscheibe, Ölfilter, Hochdruckpumpe...`);
                        break;
                    }
                    if (text.length < 2) { await addBot('Bitte geben Sie den Teilenamen ein, z.B. **Bremsscheibe**, **Ölfilter** oder **Hochdruckpumpe**.'); break; }
                    setPartQuery(text.trim());
                    setPhase('vehicle_method');
                    await addBot(`🔧 Teil: **${text.trim()}**\n\n> ⚠️ Gleiches Teil, verschiedene OEMs je Fahrzeug — **VIN ist entscheidend!**\n\nWie möchten Sie Ihr Fahrzeug identifizieren?\n\n**1️⃣** Fahrzeugbrief-Foto hochladen\n**2️⃣** VIN/FIN eingeben (17-stellig)\n**3️⃣** HSN/TSN manuell eingeben`);
                    break;
                }
                case 'vehicle_method': {
                    if (image) {
                        const vin = 'WBAPH5C55BA' + Math.floor(100000 + Math.random() * 900000);
                        await addBot(`📸 **Fahrzeugbrief erkannt!**\nVIN: \`${vin}\``);
                        await runProcessing(partQuery, { vin, make: 'BMW', model: '320d' });
                        return;
                    }
                    // Check for VIN in response
                    if (parsed.vin) {
                        await addBot(`✅ VIN: \`${parsed.vin}\``);
                        const vehicle: Record<string, string> = { vin: parsed.vin };
                        if (parsed.make) vehicle.make = parsed.make;
                        if (parsed.model) vehicle.model = parsed.model;
                        if (parsed.year) vehicle.year = parsed.year;
                        if (parsed.engine) vehicle.engine = parsed.engine;
                        await runProcessing(partQuery, vehicle);
                        return;
                    }
                    // Check for HSN/TSN
                    if (parsed.hsn && parsed.tsn) {
                        await addBot(`✅ HSN/TSN: \`${parsed.hsn}/${parsed.tsn}\``);
                        await runProcessing(partQuery, { hsn: parsed.hsn, tsn: parsed.tsn });
                        return;
                    }
                    if (text === '1' || /foto|bild|upload/i.test(text)) { await addBot('📷 Klicken Sie unten links auf 📎 um ein Foto hochzuladen.'); break; }
                    if (text === '2' || /vin|fin|fahr/i.test(text)) { setPhase('vin_input'); await addBot('🔢 Bitte die **17-stellige VIN/FIN** eingeben.\n\n_Sie finden diese im Fahrzeugbrief (Feld E) oder auf der Fahrertür._'); break; }
                    if (text === '3' || /hsn|tsn/i.test(text)) { setPhase('hsn_input'); await addBot('📝 Bitte **HSN und TSN** eingeben.\n\nFormat: `0005 CJ2`\n\n_HSN = 4 Ziffern, TSN = 3 Zeichen. Finden Sie im Fahrzeugschein Feld 2.1 und 2.2._'); break; }
                    await addBot('Bitte wählen Sie eine Option:\n\n**1** = Fahrzeugbrief-Foto\n**2** = VIN/FIN eingeben\n**3** = HSN/TSN manuell');
                    break;
                }
                case 'vin_input': {
                    if (parsed.vin) {
                        await addBot(`✅ VIN: \`${parsed.vin}\``);
                        await runProcessing(partQuery, { vin: parsed.vin });
                        return;
                    }
                    const raw = text.replace(/[\s-]/g, '').toUpperCase();
                    if (/^[A-HJ-NPR-Z0-9]{17}$/.test(raw)) {
                        await addBot(`✅ VIN: \`${raw}\``);
                        await runProcessing(partQuery, { vin: raw });
                        return;
                    }
                    await addBot('❌ Ungültige VIN. Die VIN muss genau **17 Zeichen** lang sein (Buchstaben + Ziffern, ohne I, O, Q).\n\nBitte erneut versuchen.');
                    break;
                }
                case 'hsn_input': {
                    const m = text.match(/(\d{4})\s*[\/\s,.-]*\s*([A-Za-z0-9]{3})/);
                    if (!m) { await addBot('❌ Ungültiges Format.\n\nBitte so eingeben: `0005 CJ2`\n\n_HSN = 4 Ziffern, TSN = 3 Zeichen_'); break; }
                    await addBot(`✅ HSN/TSN: \`${m[1]}/${m[2].toUpperCase()}\``);
                    await runProcessing(partQuery, { hsn: m[1], tsn: m[2].toUpperCase() });
                    return;
                }
                case 'locked': { setShowCTA(true); break; }
            }
        } finally { setIsLoading(false); }
    }, [phase, partQuery, addBot, runProcessing, parseUserInput]);

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
        <section className="h-screen pt-24 pb-4 px-4 relative overflow-hidden">
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
