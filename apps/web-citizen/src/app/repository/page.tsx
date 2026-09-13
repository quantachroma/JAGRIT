'use client';

import React, { useState, useMemo } from 'react';
import { useCitizen } from '@/context/CitizenContext';
import {
  FileText,
  Search,
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  Layers,
  Sparkles,
  Building2,
  Calendar,
  MapPin,
  ArrowUpRight,
  Flame,
  Wrench,
  Compass,
  Cpu,
  Bookmark,
} from 'lucide-react';

export type RepositoryDomain =
  | 'ALL'
  | 'WATER'
  | 'SOIL'
  | 'SOLAR'
  | 'AGRITECH'
  | 'BIOGAS';

export interface FailurePostMortem {
  id: string;
  titleEn: string;
  titleHi: string;
  titleSat: string;
  institutionEn: string;
  institutionHi: string;
  institutionSat: string;
  domain: RepositoryDomain;
  domainLabelEn: string;
  domainLabelHi: string;
  domainLabelSat: string;
  date: string;
  locationEn: string;
  locationHi: string;
  locationSat: string;
  attemptedEn: string;
  attemptedHi: string;
  attemptedSat: string;
  rcaEn: string;
  rcaHi: string;
  rcaSat: string;
  takeawaysEn: string;
  takeawaysHi: string;
  takeawaysSat: string;
  isEscalatedToNational: boolean;
  nablReportUrl: string;
  githubCadUrl: string;
  materialsUsed: string[];
}

const POST_MORTEMS: FailurePostMortem[] = [
  {
    id: 'RCA-2026-WTR-001',
    titleEn: 'Electrochemical Fluoride Adsorption Cell with Dual-Cathode Zinc Mesh',
    titleHi: 'दोहरे कैथोड जिंक जाली युक्त इलेक्ट्रोकेमिकल फ्लोराइड अवशोषण सेल',
    titleSat: 'ᱵᱟᱨ ᱠᱮᱛᱷᱳᱰ ᱡᱤᱝᱠ ᱡᱟᱹᱞᱤ ᱛᱮ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱥᱟᱯᱷᱟ ᱠᱟᱹᱢᱤ',
    institutionEn: 'BIT Mesra • Department of Metallurgy & Materials Science',
    institutionHi: 'बीआईटी मेसरा • धातुकर्म एवं पदार्थ विज्ञान विभाग',
    institutionSat: 'ᱵᱤ.ᱟᱭ.ᱴᱤ ᱢᱮᱥᱨᱟ • ᱢᱮᱴᱟᱞᱟᱨᱡᱤ ᱦᱟᱹᱴᱤᱧ',
    domain: 'WATER',
    domainLabelEn: 'Water Filtration',
    domainLabelHi: 'जल शोधन',
    domainLabelSat: 'ᱫᱟᱜ ᱥᱟᱯᱷᱟ',
    date: 'August 2026',
    locationEn: 'Palamu, Satbarwa Block',
    locationHi: 'पलामू, सतबरवा प्रखंड',
    locationSat: 'ᱯᱟᱞᱟᱢᱩ, ᱥᱟᱛᱵᱟᱨᱣᱟ ᱵᱞᱚᱠ',
    attemptedEn:
      'Low-cost sacrificial zinc cathode stack designed to bind fluoride ions via electrochemical co-precipitation in rural groundwater without requiring grid power.',
    attemptedHi:
      'ग्रामीण भूजल में बिना ग्रिड बिजली के विद्युत-रासायनिक सह-अवक्षेपण द्वारा फ्लोराइड आयनों को बांधने हेतु कम लागत वाला जिंक कैथोड स्टैक तैयार किया गया था।',
    attemptedSat:
      'ᱟᱹᱛᱩ ᱨᱮ ᱵᱤᱡᱽᱞᱤ ᱵᱮᱜᱚᱨ ᱫᱟᱜ ᱠᱷᱚᱱ ᱯᱷᱞᱳᱨᱟᱭᱤᱰ ᱚᱰᱚᱠ ᱞᱟᱹᱜᱤᱫ ᱡᱤᱝᱠ ᱡᱟᱹᱞᱤ ᱥᱟᱯᱟᱵ ᱵᱮᱱᱟᱣ ᱞᱮᱱᱟ᱾',
    rcaEn:
      'Galvanic corrosion between copper mesh and zinc casing in acidic groundwater (pH < 4.8) caused severe baseplate pitting and membrane rupture after 18 days of continuous operation. NABL test revealed secondary zinc leaching exceeding 5.2 mg/L.',
    rcaHi:
      'अम्लीय भूजल (पीएच < 4.8) में तांबे की जाली और जस्ता आवरण के बीच गैल्वेनिक क्षरण के कारण 18 दिनों के निरंतर संचालन के बाद मेम्ब्रेन फट गई। एनएबीएल प्रयोगशाला परीक्षण में 5.2 मिलीग्राम/लीटर तक जस्ता का रिसाव दर्ज हुआ।',
    rcaSat:
      'ᱠᱷᱟᱴᱟ ᱫᱟᱜ (pH < ᱔.᱘) ᱠᱷᱟᱹᱛᱤᱨ ᱛᱟᱸᱵᱟ ᱟᱨ ᱡᱤᱝᱠ ᱢᱩᱫᱽ ᱨᱮ ᱠᱷᱤᱭᱟᱹᱣ ᱦᱩᱭ ᱮᱱᱟ ᱟᱨ ᱑᱘ ᱢᱟᱦᱟᱸ ᱨᱮ ᱢᱮᱢᱵᱨᱮᱱ ᱯᱷᱟᱴᱟᱣ ᱮᱱᱟ᱾ NABL ᱯᱟᱹᱨᱠᱷᱟᱹᱣ ᱨᱮ ᱡᱤᱝᱠ ᱫᱟᱜ ᱨᱮ ᱕.᱒ mg/L ᱵᱮᱥᱤ ᱧᱟᱢ ᱮᱱᱟ᱾',
    takeawaysEn:
      'Future teams must eliminate copper-zinc galvanic couples. Substitute with passivated titanium mesh or Hastelloy-C, and integrate a sacrificial magnesium anode with auto-cut-off telemetry.',
    takeawaysHi:
      'भविष्य के शोध दलों को तांबा-जस्ता के सीधे संपर्क से बचना चाहिए। इसके स्थान पर पैसिवेडेड टाइटेनियम जाली या हेस्टेलॉय-सी का उपयोग करें और मैग्नीशियम एनोड संलग्न करें।',
    takeawaysSat:
      'ᱛᱟᱭᱚᱢ ᱫᱟᱨᱟᱢ ᱫᱚᱞ ᱠᱚ ᱫᱚ ᱛᱟᱸᱵᱟ-ᱡᱤᱝᱠ ᱵᱚᱫᱚᱞ ᱛᱮ ᱴᱟᱭᱴᱟᱱᱤᱭᱚᱢ ᱡᱟᱹᱞᱤ ᱵᱮᱵᱷᱟᱨ ᱢᱟ ᱟᱨ ᱢᱮᱜᱽᱱᱮᱥᱤᱭᱚᱢ ᱡᱚᱲᱟᱣ ᱢᱟ᱾',
    isEscalatedToNational: true,
    nablReportUrl: '#nabl-report-wtr-001',
    githubCadUrl: '#cad-schematic-wtr-001',
    materialsUsed: ['Zinc Mesh', 'Copper Braid', 'PVDF Membrane', 'HDPE Enclosure'],
  },
  {
    id: 'RCA-2026-SLR-002',
    titleEn: 'Perovskite Thin-Film Solar Array for Forest Canopy Microgrid',
    titleHi: 'जंगल कैनोपी माइक्रोग्रिड हेतु पेरोव्स्काइट थिन-फिल्म सौर पैनल',
    titleSat: 'ᱵᱤᱨ ᱵᱷᱤᱛᱨᱤ ᱵᱤᱡᱽᱞᱤ ᱞᱟᱹᱜᱤᱫ ᱯᱮᱨᱳᱵᱷᱥᱠᱟᱭᱤᱴ ᱥᱚᱞᱟᱨ ᱯᱮᱱᱮᱞ',
    institutionEn: 'NIT Jamshedpur • Department of Electrical Engineering',
    institutionHi: 'एनआईटी जमशेदपुर • विद्युत अभियांत्रिकी विभाग',
    institutionSat: 'ᱮᱱ.ᱟᱭ.ᱴᱤ ᱡᱟᱢᱥᱮᱫᱽᱯᱩᱨ • ᱵᱤᱡᱽᱞᱤ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ',
    domain: 'SOLAR',
    domainLabelEn: 'Solar & Energy Storage',
    domainLabelHi: 'सौर ऊर्जा एवं बैटरी भंडारण',
    domainLabelSat: 'ᱵᱮᱨ ᱵᱤᱡᱽᱞᱤ ᱟᱨ ᱵᱮᱴᱟᱨᱤ',
    date: 'July 2026',
    locationEn: 'Saranda Forest, West Singhbhum',
    locationHi: 'सारंडा वन, पश्चिमी सिंहभूम',
    locationSat: 'ᱥᱟᱨᱟᱱᱰᱟ ᱵᱤᱨ, ᱯᱟᱪᱮ ᱥᱤᱝᱵᱷᱩᱢ',
    attemptedEn:
      'Flexible perovskite solar sheets mounted under intermittent dense Sal forest canopy to charge immunization cold-boxes for remote mobile clinics.',
    attemptedHi:
      'दूरदराज के सचल स्वास्थ्य क्लीनिकों में टीकों के कोल्ड-बॉक्स को चार्ज करने हेतु साल वृक्षों की छाया के नीचे लचीली पेरोव्स्काइट सौर शीट लगाई गई थीं।',
    attemptedSat:
      'ᱥᱟᱨᱟᱱᱰᱟ ᱵᱤᱨ ᱨᱮ ᱨᱟᱱ ᱴᱤᱠᱟᱹ ᱨᱮᱭᱟᱲ ᱫᱚᱦᱚ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱩᱢᱩᱞ ᱨᱮ ᱱᱚᱶᱟ ᱥᱚᱞᱟᱨ ᱯᱮᱱᱮᱞ ᱞᱟᱜᱟᱣ ᱞᱮᱱᱟ᱾',
    rcaEn:
      'Ambient relative humidity exceeding 92% combined with early morning condensation penetrated module edges, degrading the methylammonium lead iodide active layer within 140 hours. Efficiency plummeted from 19.4% to 2.1%.',
    rcaHi:
      '९२% से अधिक सापेक्ष आर्द्रता और सुबह की ओस ने किनारों से प्रवेश कर मिथाइलमोनियम लेड आयोडाइड परत को १४० घंटों में नष्ट कर दिया। दक्षता १९.४% से घटकर मात्र २.१% रह गई।',
    rcaSat:
      '᱙᱒% ᱠᱷᱚᱱ ᱵᱟᱹᱲᱛᱤ ᱫᱟᱜ ᱦᱚᱭ ᱟᱨ ᱥᱮᱛᱟᱜ ᱨᱮᱱᱟᱜ ᱥᱤᱥᱤᱨ ᱫᱟᱜ ᱛᱮ ᱑᱔᱐ ᱴᱟᱲᱟᱝ ᱨᱮ ᱥᱚᱞᱟᱨ ᱞᱮᱭᱟᱨ ᱵᱟᱹᱲᱤᱡ ᱮᱱᱟ᱾ ᱫᱟᱲᱮ ᱑᱙.᱔% ᱠᱷᱚᱱ ᱒.᱑% ᱛᱮ ᱧᱩᱨ ᱮᱱᱟ᱾',
    takeawaysEn:
      'Unsealed perovskite modules are fundamentally inadequate for Jharkhand humid forest belts. Future initiatives must use hermetically sealed CIGS or bifacial monocrystalline silicon encapsulated in ETFE fluoropolymers.',
    takeawaysHi:
      'झारखण्ड के आर्द्र वन्य क्षेत्रों में अनसील पेरोव्स्काइट अनुपयुक्त है। भविष्य में ईटीएफई फ्लोरोपॉलिमर से सीलबंद सीआईजीएस अथवा मोनोक्रिस्टलाइन सिलिकॉन का उपयोग करें।',
    takeawaysSat:
      'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱵᱤᱨ ᱴᱚᱴᱷᱟ ᱞᱟᱹᱜᱤᱫ ᱱᱚᱶᱟ ᱵᱟᱝ ᱜᱟᱱᱚᱜᱼᱟ᱾ ᱮᱴᱟᱜ ᱫᱷᱟᱣ ETFE ᱥᱤᱞ ᱟᱠᱟᱱ CIGS ᱥᱮ ᱥᱤᱞᱤᱠᱳᱱ ᱯᱮᱱᱮᱞ ᱞᱟᱜᱟᱣ ᱞᱟᱹᱠᱛᱤᱭᱟ᱾',
    isEscalatedToNational: false,
    nablReportUrl: '#nabl-report-slr-002',
    githubCadUrl: '#cad-schematic-slr-002',
    materialsUsed: ['Perovskite CH3NH3PbI3', 'PET Substrate', 'Silver Nanowire'],
  },
  {
    id: 'RCA-2026-GEO-003',
    titleEn: 'Subterranean Heat Exchanger for Zero-Energy Vegetable Storage',
    titleHi: 'शून्य-ऊर्जा सब्जी शीत भंडारण हेतु भू-तापीय हीट एक्सचेंजर',
    titleSat: 'ᱥᱟᱵᱽᱡᱤ ᱥᱟᱸᱪᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱦᱟᱥᱟ ᱵᱷᱤᱛᱨᱤ ᱨᱮᱭᱟᱲ ᱦᱤᱴ ᱮᱠᱥᱪᱮᱸᱡᱚᱨ',
    institutionEn: 'IIT (ISM) Dhanbad • Department of Mining & Geo-Engineering',
    institutionHi: 'आईआईटी (आईएसएम) धनबाद • खनन एवं भू-इंजीनियरिंग विभाग',
    institutionSat: 'ᱟᱭ.ᱟᱭ.ᱴᱤ (ISM) ᱫᱷᱟᱱᱵᱟᱫᱽ • ᱦᱟᱥᱟ ᱤᱧᱡᱤᱱᱤᱭᱟᱹᱨᱤᱝ',
    domain: 'SOIL',
    domainLabelEn: 'Soil Mechanics',
    domainLabelHi: 'मृदा यांत्रिकी एवं भू-तकनीक',
    domainLabelSat: 'ᱦᱟᱥᱟ ᱦᱩᱱᱟᱹᱨ',
    date: 'June 2026',
    locationEn: 'Hazaribagh, Barhi Block',
    locationHi: 'हज़ारीबाग, बरही प्रखंड',
    locationSat: 'ᱦᱟᱡᱟᱨᱤᱵᱟᱜᱽ, ᱵᱟᱨᱦᱤ ᱵᱞᱚᱠ',
    attemptedEn:
      '4-metre subterranean closed-loop vertical borehole utilizing soil thermal inertia to passively chill rural farmer vegetable warehouses to 14°C.',
    attemptedHi:
      'मिट्टी की तापीय जड़ता का उपयोग करके ग्रामीण सब्जी गोदामों को बिना बिजली १४ डिग्री सेल्सियस तक ठंडा रखने हेतु ४ मीटर गहरा वर्टिकल बोरहोल स्थापित किया गया था।',
    attemptedSat:
      'ᱦᱟᱥᱟ ᱨᱮᱱᱟᱜ ᱨᱮᱭᱟᱲ ᱫᱟᱲᱮ ᱛᱮ ᱥᱟᱵᱽᱡᱤ ᱫᱚᱦᱚ ᱚᱲᱟᱜ ᱑᱔°C ᱨᱮᱭᱟᱲ ᱫᱚᱦᱚ ᱞᱟᱹᱜᱤᱫ ᱔ ᱢᱤᱴᱟᱨ ᱞᱟᱛᱟᱨ ᱵᱳᱨᱦᱳᱞ ᱵᱮᱱᱟᱣ ᱞᱮᱱᱟ᱾',
    rcaEn:
      'Severe lateral soil shrinkage during the Jharkhand summer dry spell created 15-20mm air voids around the HDPE tubing. This thermal insulation gap reduced soil-to-pipe heat transfer by 78%, causing internal storage temperatures to soar above 34°C.',
    rcaHi:
      'ग्रीष्म ऋतु में मिट्टी के अत्यधिक सिकुड़ने से एचडीपीई पाइप के चारों ओर १५-२० मिमी की हवा की दरारें बन गईं। इस वायु अवरोध ने ताप स्थानांतरण को ७८% घटा दिया, जिससे तापमान ३४ डिग्री से ऊपर चला गया।',
    rcaSat:
      'ᱥᱤᱛᱩᱝ ᱫᱤᱱ ᱦᱟᱥᱟ ᱠᱷᱟᱴᱚ ᱮᱱ ᱠᱷᱟᱹᱛᱤᱨ ᱯᱟᱭᱤᱯ ᱟᱲᱮ ᱨᱮ ᱑᱕-᱒᱐mm ᱦᱚᱭ ᱯᱷᱟᱸᱠ ᱵᱮᱱᱟᱣ ᱮᱱᱟ᱾ ᱱᱚᱶᱟ ᱛᱮ ᱨᱮᱭᱟᱲ ᱗᱘% ᱠᱚᱢ ᱮᱱᱟ ᱟᱨ ᱞᱚᱞᱚ ᱓᱔°C ᱠᱷᱚᱱ ᱵᱟᱹᱲᱛᱤ ᱮᱱᱟ᱾',
    takeawaysEn:
      'Bentonite-graphite composite slurry backfilling is mandatory in Jharkhand laterite red soils to prevent dehydration gaps. Future projects must integrate annular moisture-wicking capillary channels.',
    takeawaysHi:
      'झारखण्ड की लाल मिट्टी में दरारें रोकने हेतु बेंटोनाइट-ग्रेफाइट स्लरी का बैकफिलिंग अनिवार्य है। साथ ही नमी बनाए रखने हेतु जल-रिसाव चैनल जोड़ें।',
    takeawaysSat:
      'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱟᱨᱟᱜ ᱦᱟᱥᱟ ᱞᱟᱹᱜᱤᱫ ᱵᱮᱱᱴᱳᱱᱟᱭᱤᱴ ᱦᱟᱥᱟ ᱵᱷᱚᱨᱟᱣ ᱞᱟᱹᱠᱛᱤᱭᱟ ᱟᱨ ᱫᱟᱜ ᱨᱮᱭᱟᱲ ᱪᱮᱱᱮᱞ ᱞᱟᱜᱟᱣ ᱦᱩᱭᱩᱜᱼᱟ᱾',
    isEscalatedToNational: true,
    nablReportUrl: '#nabl-report-geo-003',
    githubCadUrl: '#cad-schematic-geo-003',
    materialsUsed: ['HDPE SDR-11 Piping', 'Local Laterite Clay', 'Water-Glycol Loop'],
  },
  {
    id: 'RCA-2026-AGR-004',
    titleEn: 'Tractor PTO-Driven Minor Millet Centrifugal Dehuller & Sifter',
    titleHi: 'ट्रैक्टर पीटीओ चालित लघु कदन्न (मंडुआ) छिलका निष्कासन एवं छनाई यंत्र',
    titleSat: 'ᱴᱨᱮᱠᱴᱚᱨ ᱛᱮ ᱪᱟᱞᱟᱜ ᱠᱳᱫᱳ-ᱜᱩᱸᱫᱽᱞᱤ ᱦᱳᱲᱳ ᱪᱷᱟᱰᱟᱣ ᱥᱟᱯᱟᱵ',
    institutionEn: 'Birsa Agricultural University • Faculty of Agricultural Engineering',
    institutionHi: 'बिरसा कृषि विश्वविद्यालय • कृषि अभियांत्रिकी संकाय',
    institutionSat: 'ᱵᱤᱨᱥᱟ ᱪᱟᱥ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ • ᱪᱟᱥ ᱦᱩᱱᱟᱹᱨ ᱦᱟᱹᱴᱤᱧ',
    domain: 'AGRITECH',
    domainLabelEn: 'Agricultural Machinery',
    domainLabelHi: 'कृषि एवं प्रसंस्करण मशीनरी',
    domainLabelSat: 'ᱪᱟᱥ ᱥᱟᱯᱟᱵ',
    date: 'May 2026',
    locationEn: 'Khunti, Murhu Block',
    locationHi: 'खूंटी, मुरहू प्रखंड',
    locationSat: 'ᱠᱷᱩᱸᱴᱤ, ᱢᱩᱨᱦᱩ ᱵᱞᱚᱠ',
    attemptedEn:
      'Centrifugal impact dehuller connected directly to small tractor PTO to process finger millet (ragi) on-site across tribal farming cooperatives.',
    attemptedHi:
      'आदिवासी कृषक सहकारी समितियों में रागी (मंडुआ) के प्रसंस्करण हेतु छोटे ट्रैक्टर पीटीओ से सीधे जुड़ा सेंट्रीफ्यूगल डिहलर बनाया गया था।',
    attemptedSat:
      'ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱜᱟᱶᱛᱟ ᱨᱮ ᱢᱟᱹᱱᱰᱤᱭᱟᱹ ᱦᱳᱲᱳ ᱪᱷᱟᱰᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱴᱨᱮᱠᱴᱚᱨ PTO ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱥᱟᱯᱟᱵ ᱵᱮᱱᱟᱣ ᱞᱮᱱᱟ᱾',
    rcaEn:
      'Rotor rotational speed exceeded critical impact shear velocity (> 3400 RPM at 540 RPM PTO input). Rather than stripping the outer husk, the hammer blades caused 43.8% seed shattering into unmarketable flour dust.',
    rcaHi:
      'रोटर की घूर्णन गति अत्यधिक तीव्र (> 3400 RPM) हो गई। छिलका उतारने के बजाय प्रहारक ब्लेड ने 43.8% दानों को तोड़कर चूर्ण में बदल दिया, जिससे अनाज विपणन योग्य नहीं रहा।',
    rcaSat:
      'ᱥᱟᱯᱟᱵ ᱨᱮᱱᱟᱜ ᱜᱷᱩᱨᱱᱤ ᱟᱹᱰᱤ ᱞᱚᱜᱚᱱ ᱪᱟᱞᱟᱣ ᱮᱱᱟ (> ᱓᱔᱐᱐ RPM)᱾ ᱪᱷᱚᱞᱠᱟ ᱚᱰᱚᱠ ᱵᱚᱫᱚᱞ ᱛᱮ ᱔᱓.᱘% ᱫᱟᱱᱟ ᱨᱟᱹᱯᱩᱫ ᱠᱟᱛᱮ ᱦᱚᱞᱚᱝ ᱮᱱᱟ᱾',
    takeawaysEn:
      'Centrifugal impact milling is fundamentally unsuitable for brittle minor millets. Future designs must adopt rubberized conical friction rollers rotating under 1200 RPM with micrometric gap calibration.',
    takeawaysHi:
      'नाजुक कदन्न हेतु प्रभाव विधि अनुपयुक्त है। भविष्य में १२०० आरपीएम से कम गति वाले रबर-लेपित शंक्वाकार घर्षण रोलर एवं माइक्रोन गैप समायोजन का उपयोग करें।',
    takeawaysSat:
      'ᱠᱟᱹᱴᱤᱡ ᱫᱟᱱᱟ ᱞᱟᱹᱜᱤᱫ ᱱᱚᱶᱟ ᱵᱟᱝ ᱴᱷᱤᱠᱟ᱾ ᱛᱟᱭᱚᱢ ᱛᱮ ᱨᱟᱵᱚᱨ ᱨᱳᱞᱟᱨ ᱵᱮᱵᱷᱟᱨ ᱢᱟ ᱡᱟᱦᱟᱸ ᱫᱚ ᱑᱒᱐᱐ RPM ᱠᱷᱚᱱ ᱠᱚᱢ ᱜᱷᱩᱨᱱᱤ ᱛᱮ ᱪᱟᱞᱟᱜᱼᱟ᱾',
    isEscalatedToNational: false,
    nablReportUrl: '#nabl-report-agr-004',
    githubCadUrl: '#cad-schematic-agr-004',
    materialsUsed: ['Mild Steel Casing', 'Hardened EN8 Impact Blades', 'Cast Iron Pulleys'],
  },
  {
    id: 'RCA-2026-BIO-005',
    titleEn: 'Thermophilic Biogas Digestor with Slag Waste Insulation Blanket',
    titleHi: 'इस्पात स्लैग अपशिष्ट ऊष्मारोधक युक्त थर्मोफिलिक बायोगैस संयंत्र',
    titleSat: 'ᱢᱮᱬᱦᱮᱫ ᱠᱟᱹᱨᱠᱷᱟᱱᱟ ᱚᱵᱽᱥᱮᱥ ᱛᱮ ᱵᱮᱱᱟᱣ ᱵᱟᱭᱳᱜᱮᱥ ᱥᱟᱯᱟᱵ',
    institutionEn: 'Ranchi University • School of Applied Environmental Sciences',
    institutionHi: 'राँची विश्वविद्यालय • व्यावहारिक पर्यावरण विज्ञान संकाय',
    institutionSat: 'ᱨᱟᱺᱪᱤ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ • ᱯᱚᱨᱤᱵᱮᱥ ᱥᱟᱬᱮᱥ',
    domain: 'BIOGAS',
    domainLabelEn: 'Biogas & Waste',
    domainLabelHi: 'बायोगैस एवं अपशिष्ट प्रबंधन',
    domainLabelSat: 'ᱵᱟᱭᱳᱜᱮᱥ ᱟᱨ ᱚᱵᱽᱥᱮᱥ',
    date: 'April 2026',
    locationEn: 'Bokaro, Chas Block',
    locationHi: 'बोकारो, चास प्रखंड',
    locationSat: 'ᱵᱳᱠᱟᱨᱳ, ᱪᱟᱥ ᱵᱞᱚᱠ',
    attemptedEn:
      'Utilizing granulated blast furnace slag from Bokaro Steel Plant as thermal insulation around an anaerobic village digestor to maintain methanogenesis during chilly winter nights.',
    attemptedHi:
      'सर्दियों की रातों में मीथेन उत्पादन बनाए रखने हेतु बोकारो स्टील प्लांट से प्राप्त दानेदार स्लैग का बायोगैस डाइजेस्टर के चारों ओर ऊष्मारोधी परत के रूप में प्रयोग किया गया।',
    attemptedSat:
      'ᱨᱟᱵᱟᱝ ᱫᱤᱱ ᱵᱟᱭᱳᱜᱮᱥ ᱴᱷᱤᱠ ᱫᱚᱦᱚ ᱞᱟᱹᱜᱤᱫ ᱵᱳᱠᱟᱨᱳ ᱥᱴᱤᱞ ᱯᱞᱟᱱᱴ ᱠᱷᱚᱱ ᱧᱟᱢ ᱟᱠᱟᱱ ᱥᱞᱮᱜᱽ ᱛᱮ ᱵᱟᱭᱳᱜᱮᱥ ᱮᱥᱮᱫ ᱞᱮᱱᱟ᱾',
    rcaEn:
      'High sulfur and calcium sulfide content in unwashed industrial slag reacted with ground moisture, generating acidic sulfurous leachate. This aggressively degraded the PVC geomembrane dome seal within 32 days, resulting in chronic methane leakage and digester stalling.',
    rcaHi:
      'अधोते औद्योगिक स्लैग में अत्यधिक सल्फर ने नमी के साथ मिलकर गंधकयुक्त अम्ल बना दिया। इसने ३२ दिनों में पीवीसी जियोमेम्ब्रेन को गला दिया, जिससे मीथेन रिसाव होने लगा और संयंत्र ठप हो गया।',
    rcaSat:
      'ᱵᱟᱝ ᱥᱟᱯᱷᱟ ᱟᱠᱟᱱ ᱥᱞᱮᱜᱽ ᱨᱮ ᱥᱟᱞᱯᱷᱟᱨ ᱠᱷᱟᱹᱛᱤᱨ ᱛᱮ ᱮᱥᱤᱰ ᱵᱮᱱᱟᱣ ᱮᱱᱟ ᱟᱨ ᱓᱒ ᱢᱟᱦᱟᱸ ᱨᱮ PVC ᱰᱳᱢ ᱜᱚᱞᱟᱣ ᱮᱱᱟ᱾ ᱜᱮᱥ ᱡᱚᱨᱚ ᱮᱱ ᱠᱷᱟᱹᱛᱤᱨ ᱥᱟᱯᱟᱵ ᱵᱚᱸᱫᱽ ᱮᱱᱟ᱾',
    takeawaysEn:
      'Industrial slag must undergo rigorous alkaline washing and neutralization before civil contact. Alternatively, substitute with expanded clay aggregates (LECA) or localized carbonized rice husk insulation.',
    takeawaysHi:
      'औद्योगिक स्लैग का उपयोग करने से पहले क्षारीय धुलाई और निराकरण अनिवार्य है। विकल्प के रूप में हल्की विस्तारित मिट्टी अथवा जली हुई धान की भूसी का प्रयोग करें।',
    takeawaysSat:
      'ᱠᱟᱹᱨᱠᱷᱟᱱᱟ ᱥᱞᱮᱜᱽ ᱵᱮᱵᱷᱟᱨ ᱢᱟᱲᱟᱝ ᱥᱟᱯᱷᱟ ᱞᱟᱹᱠᱛᱤᱭᱟ᱾ ᱵᱟᱝᱠᱷᱟᱱ ᱦᱳᱲᱳ ᱪᱷᱳᱞᱠᱟ ᱛᱮ ᱩᱫᱽᱜᱟᱹᱣ ᱨᱮᱭᱟᱲ ᱮᱥᱮᱫ ᱢᱟ᱾',
    isEscalatedToNational: false,
    nablReportUrl: '#nabl-report-bio-005',
    githubCadUrl: '#cad-schematic-bio-005',
    materialsUsed: ['Granulated Blast Furnace Slag', 'PVC Geomembrane', 'Cowdung Slurry'],
  },
];

export default function RepositoryPage() {
  const { language, t } = useCitizen();

  const [activeDomain, setActiveDomain] = useState<RepositoryDomain>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const domains = [
    {
      id: 'ALL' as RepositoryDomain,
      label:
        language === 'hi'
          ? 'सभी क्षेत्र'
          : language === 'sat'
          ? 'ᱡᱚᱛᱚ ᱦᱟᱹᱴᱤᱧ'
          : 'All Domains',
    },
    {
      id: 'WATER' as RepositoryDomain,
      label:
        language === 'hi'
          ? 'जल शोधन'
          : language === 'sat'
          ? 'ᱫᱟᱜ ᱥᱟᱯᱷᱟ'
          : 'Water Filtration',
    },
    {
      id: 'SOIL' as RepositoryDomain,
      label:
        language === 'hi'
          ? 'मृदा यांत्रिकी'
          : language === 'sat'
          ? 'ᱦᱟᱥᱟ ᱦᱩᱱᱟᱹᱨ'
          : 'Soil Mechanics',
    },
    {
      id: 'SOLAR' as RepositoryDomain,
      label:
        language === 'hi'
          ? 'सौर एवं ऊर्जा'
          : language === 'sat'
          ? 'ᱵᱮᱨ ᱵᱤᱡᱽᱞᱤ'
          : 'Solar & Energy Storage',
    },
    {
      id: 'AGRITECH' as RepositoryDomain,
      label:
        language === 'hi'
          ? 'कृषि मशीनरी'
          : language === 'sat'
          ? 'ᱪᱟᱥ ᱥᱟᱯᱟᱵ'
          : 'Agricultural Machinery',
    },
    {
      id: 'BIOGAS' as RepositoryDomain,
      label:
        language === 'hi'
          ? 'बायोगैस एवं अपशिष्ट'
          : language === 'sat'
          ? 'ᱵᱟᱭᱳᱜᱮᱥ ᱚᱵᱽᱥᱮᱥ'
          : 'Biogas & Waste',
    },
  ];

  const filteredPostMortems = useMemo(() => {
    return POST_MORTEMS.filter((item) => {
      if (activeDomain !== 'ALL' && item.domain !== activeDomain) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesEn =
          item.titleEn.toLowerCase().includes(q) ||
          item.rcaEn.toLowerCase().includes(q) ||
          item.institutionEn.toLowerCase().includes(q) ||
          item.materialsUsed.some((m) => m.toLowerCase().includes(q));
        const matchesHi =
          item.titleHi.toLowerCase().includes(q) ||
          item.rcaHi.toLowerCase().includes(q) ||
          item.institutionHi.toLowerCase().includes(q);
        const matchesSat =
          item.titleSat.toLowerCase().includes(q) ||
          item.rcaSat.toLowerCase().includes(q) ||
          item.institutionSat.toLowerCase().includes(q);
        return matchesEn || matchesHi || matchesSat;
      }
      return true;
    });
  }, [activeDomain, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* 1. Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span>
            {language === 'hi'
              ? 'झारखण्ड खुला विज्ञान एवं अनुसंधान ज्ञान मंच'
              : language === 'sat'
              ? 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱟᱲᱟ ᱥᱟᱬᱮᱥ ᱟᱨ ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ ᱜᱟᱲ'
              : 'Jharkhand Open Science & R&D Knowledge Commons'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'hi'
            ? 'अनुसंधान विफलता एवं विश्लेषण ज्ञानकोश'
            : language === 'sat'
            ? 'ᱠᱷᱚᱸᱫᱽᱨᱚᱸᱫᱽ ᱵᱟᱝ ᱥᱟᱹᱛ ᱟᱨ ᱵᱤᱪᱟᱹᱨ ᱵᱷᱟᱱᱰᱟᱨ'
            : 'R&D Failure & Post-Mortem Repository'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {language === 'hi'
            ? 'विश्वविद्यालयों के मध्य त्रुटियों की पुनरावृत्ति रोकने हेतु विगत असफल प्रोटोटाइप, सामग्री परीक्षण और मूल-कारण विश्लेषणों (आरसीए) का पारदर्शी संकलन।'
            : language === 'sat'
            ? 'ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱚᱨᱮ ᱵᱟᱹᱲᱤᱡ ᱠᱟᱹᱢᱤ ᱟᱨᱦᱚᱸ ᱵᱟᱝ ᱦᱩᱭᱩᱜ ᱢᱟ ᱚᱱᱟ ᱞᱟᱹᱜᱤᱫ ᱵᱟᱝ ᱥᱟᱹᱛ ᱟᱠᱟᱱ ᱥᱟᱯᱟᱵ ᱨᱮᱱᱟᱜ ᱵᱤᱪᱟᱹᱨ ᱥᱟᱠᱟᱢ᱾'
            : 'Transparent catalog of unsuccessful prototypes, metallurgical analyses, and root-cause post-mortems to prevent duplicate research efforts across universities.'}
        </p>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3.5">
        {/* Search Input (Touch Target >= 48px) */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'विफलता के प्रकार, प्रयुक्त सामग्री अथवा विश्वविद्यालय से खोजें (उदा. जिंक, संक्षारण, पेरोव्स्काइट)...'
                : language === 'sat'
                ? 'ᱠᱷᱟᱹᱢᱤ ᱦᱟᱹᱴᱤᱧ, ᱥᱟᱯᱟᱵ ᱥᱮ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱧᱩᱛᱩᱢ ᱛᱮ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ...'
                : 'Search by failure mode, material, or university (e.g., zinc corrosion, perovskite, slurry)...'
            }
            className="w-full pl-10 pr-4 py-3 min-h-[48px] text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all bg-slate-50/50"
          />
        </div>

        {/* Domain Filter Pills (Touch Targets >= 48px) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {domains.map((d) => {
            const isSelected = activeDomain === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDomain(d.id)}
                className={`px-4 py-2.5 min-h-[48px] rounded-xl font-bold whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Post-Mortem Cards List */}
      <div className="space-y-6">
        {filteredPostMortems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-2">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">
              {language === 'hi'
                ? 'कोई विफलता विश्लेषण उपलब्ध नहीं'
                : language === 'sat'
                ? 'ᱪᱮᱫ ᱦᱚᱸ ᱵᱟᱝ ᱧᱟᱢ ᱞᱮᱱᱟ'
                : 'No post-mortem records match your filter criteria'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'कृपया अन्य खोज शब्द अथवा क्षेत्र का चयन करें।'
                : language === 'sat'
                ? 'ᱮᱴᱟᱜ ᱥᱟᱛᱟᱢ ᱵᱟᱪᱷᱟᱣ ᱢᱮ᱾'
                : 'Try adjusting your search query or choosing another domain.'}
            </p>
          </div>
        ) : (
          filteredPostMortems.map((item) => {
            const title =
              language === 'hi'
                ? item.titleHi
                : language === 'sat'
                ? item.titleSat
                : item.titleEn;

            const institution =
              language === 'hi'
                ? item.institutionHi
                : language === 'sat'
                ? item.institutionSat
                : item.institutionEn;

            const location =
              language === 'hi'
                ? item.locationHi
                : language === 'sat'
                ? item.locationSat
                : item.locationEn;

            const domainLabel =
              language === 'hi'
                ? item.domainLabelHi
                : language === 'sat'
                ? item.domainLabelSat
                : item.domainLabelEn;

            const attempted =
              language === 'hi'
                ? item.attemptedHi
                : language === 'sat'
                ? item.attemptedSat
                : item.attemptedEn;

            const rca =
              language === 'hi'
                ? item.rcaHi
                : language === 'sat'
                ? item.rcaSat
                : item.rcaEn;

            const takeaways =
              language === 'hi'
                ? item.takeawaysHi
                : language === 'sat'
                ? item.takeawaysSat
                : item.takeawaysEn;

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="space-y-2 border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[11px] font-black bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200">
                        {item.id}
                      </span>
                      <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                        {domainLabel}
                      </span>
                    </div>

                    {/* Escalation to National Problem Statement Badge */}
                    {item.isEscalatedToNational && (
                      <span className="inline-flex items-center space-x-1.5 bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-[11px] font-black shadow-xs">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        <span>
                          {language === 'hi'
                            ? 'राष्ट्रीय हैकथॉन समस्या विवरण में पदोन्नत'
                            : language === 'sat'
                            ? 'ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱦᱮᱠᱟᱛᱷᱚᱱ ᱨᱮ ᱨᱟᱠᱟᱵ ᱮᱱᱟ'
                            : 'Promoted to Pan-India National Hackathon Problem Statement'}
                        </span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {title}
                  </h3>

                  <div className="flex items-center flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{institution}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{item.date}</span>
                    </span>
                  </div>
                </div>

                {/* Section 1: What Was Attempted */}
                <div className="space-y-1.5 text-xs leading-relaxed">
                  <span className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {language === 'hi'
                        ? 'क्या प्रयास किया गया था (परिकल्पना एवं प्रोटोटाइप)'
                        : language === 'sat'
                        ? 'ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱠᱩᱨᱩᱢᱩᱴᱩ ᱞᱮᱱᱟ'
                        : 'What Was Attempted (Hypothesis & Prototype)'}
                    </span>
                  </span>
                  <p className="text-slate-700 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                    {attempted}
                  </p>
                </div>

                {/* Section 2: Why It Failed - Root Cause Analysis (Distinct Red Callout #FEE2E2 with border #EF4444) */}
                <div className="space-y-1.5">
                  <span className="font-extrabold text-red-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span>
                      {language === 'hi'
                        ? 'विफलता का मूल कारण विश्लेषण (आरसीए)'
                        : language === 'sat'
                        ? 'ᱵᱟᱝ ᱥᱟᱹᱛ ᱨᱮᱱᱟᱜ ᱢᱩᱲ ᱠᱟᱨᱚᱱ ᱵᱤᱪᱟᱹᱨ'
                        : 'Why It Failed — Root Cause Analysis (RCA)'}
                    </span>
                  </span>
                  <div className="bg-[#FEE2E2] border border-[#EF4444] text-red-950 p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-xs">
                    {rca}
                  </div>
                </div>

                {/* Section 3: Key Takeaways for Future Teams (Distinct Green Callout #DCFCE7 with border #22C55E) */}
                <div className="space-y-1.5">
                  <span className="font-extrabold text-emerald-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {language === 'hi'
                        ? 'भविष्य के शोध दलों हेतु मुख्य सीख'
                        : language === 'sat'
                        ? 'ᱛᱟᱭᱚᱢ ᱫᱟᱨᱟᱢ ᱫᱚᱞ ᱞᱟᱹᱜᱤᱫ ᱢᱩᱲ ᱪᱮᱫᱚᱜ ᱠᱟᱛᱷᱟ'
                        : 'Key Takeaways for Future Teams'}
                    </span>
                  </span>
                  <div className="bg-[#DCFCE7] border border-[#22C55E] text-emerald-950 p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-xs">
                    {takeaways}
                  </div>
                </div>

                {/* Material Tags & Action Links */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center flex-wrap gap-1.5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase mr-1">
                      {language === 'hi' ? 'सामग्री:' : language === 'sat' ? 'ᱥᱟᱯᱟᱵ:' : 'Materials:'}
                    </span>
                    {item.materialsUsed.map((mat) => (
                      <span
                        key={mat}
                        className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>

                  {/* Action Links (Touch Target >= 48px) */}
                  <div className="flex items-center flex-wrap gap-2">
                    <a
                      href={item.nablReportUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(
                          language === 'hi'
                            ? 'एनएबीएल परीक्षण रिपोर्ट (पीडीएफ) डाउनलोड प्रक्रियाधीन...'
                            : language === 'sat'
                            ? 'NABL ᱨᱤᱯᱳᱨᱴ ᱰᱟᱣᱩᱱᱞᱳᱰ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ...'
                            : 'NABL Certified Material Metallurgical Test Report downloaded (Simulated PDF).'
                        );
                      }}
                      className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2.5 min-h-[48px] rounded-xl border border-slate-300 transition-all active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-700" />
                      <span>
                        {language === 'hi'
                          ? 'एनएबीएल परीक्षण रिपोर्ट (पीडीएफ)'
                          : language === 'sat'
                          ? 'NABL ᱴᱮᱥᱴ ᱨᱤᱯᱳᱨᱴ (PDF)'
                          : 'Download Full NABL Test Report (PDF)'}
                      </span>
                    </a>

                    <a
                      href={item.githubCadUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(
                          language === 'hi'
                            ? 'गिटहब सीएडी रिपॉजिटरी खोली जा रही है...'
                            : language === 'sat'
                            ? 'GitHub CAD ᱡᱷᱤᱡᱚᱜ ᱠᱟᱱᱟ...'
                            : 'Redirecting to open-source GitHub CAD & Circuit Repository.'
                        );
                      }}
                      className="inline-flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-3.5 py-2.5 min-h-[48px] rounded-xl border border-blue-200 transition-all active:scale-95"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
                      <span>
                        {language === 'hi'
                          ? 'सीएडी एवं सर्किट फोर्क करें'
                          : language === 'sat'
                          ? 'CAD ᱥᱠᱤᱢᱮᱴᱤᱠ ᱯᱷᱳᱨᱠ ᱢᱮ'
                          : 'Fork CAD / Circuit Schematics (GitHub)'}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

