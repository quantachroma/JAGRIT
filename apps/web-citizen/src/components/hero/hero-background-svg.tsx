import React from 'react';

/**
 * HeroBackgroundSvg
 * 
 * Authentic, civic-grade background for the JAGRIT portal celebrating Jharkhand's identity:
 * - Seamless deep navy-to-twilight background gradient (WCAG AA/AAA contrast maintained)
 * - Pure gradient safe-zone behind central typography (JAGRIT title, subtitle, and CTA buttons)
 * - Corner-confined authentic Sohrai & Khovar indigenous tribal mural motifs (16-19% opacity):
 *   * Concentric chevron/triangle mountain glyphs & stepped friezes
 *   * Comb-scraped (kanghi) wave lines & Sal leaf (sarjom sakam) fronds
 *   * Stylized folk animal outline silhouettes: Sohrai Peacock (Mor) & Antlered Forest Stag (Hiran)
 *   * Subtle Sohrai earth pigments (burnt terracotta #C85A32 and yellow ochre #D97706)
 * - Full-width horizon band behind the stakeholder cards section (15-20% opacity):
 *   * Netarhat plateau flat-topped mesas & Patratu Valley rolling ghat slopes
 *   * Continuous silhouette line-art strip of Jharkhand's Sal forest tree line (Shorea robusta / Sarjom)
 * - Completely static, clean vector art with zero runtime dependencies
 */
export default function HeroBackgroundSvg() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Base Gradient: Deep midnight navy smoothly flowing into rich sapphire & twilight navy */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#051120] via-[#091b35] via-45% to-[#0b2244]" />

      {/* 2. Ambient Radial Glow: Subtle institutional focus on the upper emblem */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(56, 189, 248, 0.35), rgba(30, 58, 138, 0.12) 65%, transparent 80%)'
        }}
      />

      {/* 3. Smooth Gradient Transition Zone: Soft lighter navy/blue-tinted wash extending behind stakeholder cards */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[480px] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(12, 34, 64, 0.4) 35%, rgba(14, 42, 80, 0.7) 70%, rgba(16, 48, 92, 0.9) 100%)'
        }}
      />

      {/* 4. Layered SVG Artwork: Strictly confined to Margin Safe-Zones & Full-Width Horizon Strip */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <defs>
          {/* Subtle Terracotta/Ochre linear gradient for Sohrai tribal accents */}
          <linearGradient id="sohraiEarthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C2410C" stopOpacity="0.8" />
          </linearGradient>

          {/* Netarhat Plateau Mesa Silhouette Gradient */}
          <linearGradient id="netarhatPlateauGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#0284c7" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#031f4a" stopOpacity="0.03" />
          </linearGradient>

          {/* Patratu Valley Rolling Hills Gradient with Sal Forest undertone */}
          <linearGradient id="patratuValleyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.16" />
            <stop offset="30%" stopColor="#10b981" stopOpacity="0.11" />
            <stop offset="70%" stopColor="#0f766e" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#061a33" stopOpacity="0.02" />
          </linearGradient>

          {/* Foreground Terraced Ridge Gradient */}
          <linearGradient id="chotanagpurRidgeGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.16" />
            <stop offset="60%" stopColor="#1e3a8a" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#081e3e" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* ========================================================================= */}
        {/* TOP-LEFT CORNER SAFE-ZONE (x <= 200, y <= 180): AUTHENTIC SOHRAI / KHOVAR  */}
        {/* ========================================================================= */}
        <g className="hidden md:block" opacity="0.19">
          {/* Traditional Sohrai Comb-scraped Wave Lines with Ochre & Terracotta */}
          <path
            d="M 0,22 Q 25,10 50,22 T 100,22 T 150,22 T 195,22"
            stroke="#D97706"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 0,30 Q 25,18 50,30 T 100,30 T 150,30 T 195,30"
            stroke="#EA580C"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0,38 Q 25,26 50,38 T 100,38 T 150,38 T 195,38"
            stroke="#7dd3fc"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Layered Concentric Triangle Frieze (Sohrai Mountain / Pahar Motifs) */}
          <g transform="translate(10, 52)">
            {/* 5 Concentric Triangle Units */}
            {[0, 36, 72, 108, 144].map((offsetX, idx) => (
              <g key={idx} transform={`translate(${offsetX}, 0)`}>
                {/* Outer Triangle */}
                <polygon points="16,0 32,24 0,24" stroke="#D97706" strokeWidth="1" fill="none" />
                {/* Middle Concentric Triangle */}
                <polygon points="16,6 26,21 6,21" stroke="#EA580C" strokeWidth="0.8" fill="none" />
                {/* Inner Concentric Triangle */}
                <polygon points="16,12 21,19 11,19" stroke="#7dd3fc" strokeWidth="0.7" fill="#FDBA74" fillOpacity="0.2" />
                {/* Sacred Dot at Base */}
                <circle cx="16" cy="27" r="1.5" fill="#FDBA74" />
              </g>
            ))}
          </g>

          {/* Sohrai Folk Peacock (Mor) Outline Silhouette & Sal Leaf Fronds */}
          <g transform="translate(18, 92)">
            {/* Sal Leaf / Grain Stalk (Sarjom Sakam / Dhan ki Baali) Branching */}
            <path
              d="M 10,60 C 25,50 45,52 65,45"
              stroke="#EA580C"
              strokeWidth="0.9"
              fill="none"
            />
            {/* Stylized Leaf pairs */}
            <path d="M 22,55 Q 26,48 32,53 Q 27,58 22,55" stroke="#D97706" strokeWidth="0.8" fill="none" />
            <path d="M 38,52 Q 43,44 49,50 Q 43,55 38,52" stroke="#D97706" strokeWidth="0.8" fill="none" />
            <path d="M 54,48 Q 59,40 65,46 Q 59,51 54,48" stroke="#D97706" strokeWidth="0.8" fill="none" />

            {/* Folk Peacock Outline Body */}
            {/* Body teardrop outline */}
            <path
              d="M 85,42 C 95,30 110,32 112,45 C 114,56 100,62 88,55 Z"
              stroke="#7dd3fc"
              strokeWidth="1.1"
              fill="none"
            />
            {/* S-curve Arching Neck & Head */}
            <path
              d="M 108,38 C 114,28 112,18 120,12 C 124,8 130,10 132,14 C 133,18 128,24 122,28 L 112,38"
              stroke="#38bdf8"
              strokeWidth="1.1"
              fill="none"
            />
            {/* Sharp Beak with Grain */}
            <path d="M 132,13 L 138,15 L 132,17" stroke="#FDBA74" strokeWidth="1" fill="none" />
            <circle cx="141" cy="15" r="1.2" fill="#FDBA74" />
            {/* 3 Radiating Crest Feathers (Kalgi / Chunda) */}
            <line x1="126" y1="9" x2="128" y2="2" stroke="#FDBA74" strokeWidth="0.9" />
            <circle cx="128" cy="1.5" r="1" fill="#FDBA74" />
            <line x1="129" y1="8" x2="134" y2="3" stroke="#FDBA74" strokeWidth="0.9" />
            <circle cx="134" cy="2.5" r="1" fill="#FDBA74" />
            <line x1="131" y1="10" x2="138" y2="7" stroke="#FDBA74" strokeWidth="0.9" />
            <circle cx="138" cy="6.5" r="1" fill="#FDBA74" />
            {/* Delicate Arching Fan-Tail Feathers with Eye Spots */}
            <path d="M 85,45 C 65,38 48,45 35,55" stroke="#60a5fa" strokeWidth="0.9" fill="none" />
            <circle cx="37" cy="53" r="2.2" stroke="#EA580C" strokeWidth="0.7" fill="none" />
            <path d="M 86,49 C 68,46 52,55 42,68" stroke="#60a5fa" strokeWidth="0.9" fill="none" />
            <circle cx="44" cy="66" r="2.2" stroke="#EA580C" strokeWidth="0.7" fill="none" />
            <path d="M 88,53 C 72,55 60,68 55,80" stroke="#60a5fa" strokeWidth="0.9" fill="none" />
            <circle cx="56" cy="78" r="2.2" stroke="#EA580C" strokeWidth="0.7" fill="none" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* TOP-RIGHT CORNER SAFE-ZONE (x >= 1240, y <= 180): SOHRAI FOREST STAG     */}
        {/* ========================================================================= */}
        <g className="hidden md:block" opacity="0.19">
          {/* Traditional Sohrai Comb-scraped Wave Lines with Ochre & Terracotta */}
          <path
            d="M 1245,22 Q 1270,10 1295,22 T 1345,22 T 1395,22 T 1440,22"
            stroke="#D97706"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 1245,30 Q 1270,18 1295,30 T 1345,30 T 1395,30 T 1440,30"
            stroke="#EA580C"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 1245,38 Q 1270,26 1295,38 T 1345,38 T 1395,38 T 1440,38"
            stroke="#7dd3fc"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Layered Concentric Triangle Frieze (Sohrai Mountain / Pahar Motifs) */}
          <g transform="translate(1250, 52)">
            {[0, 36, 72, 108, 144].map((offsetX, idx) => (
              <g key={idx} transform={`translate(${offsetX}, 0)`}>
                {/* Outer Triangle */}
                <polygon points="16,0 32,24 0,24" stroke="#D97706" strokeWidth="1" fill="none" />
                {/* Middle Concentric Triangle */}
                <polygon points="16,6 26,21 6,21" stroke="#EA580C" strokeWidth="0.8" fill="none" />
                {/* Inner Concentric Triangle */}
                <polygon points="16,12 21,19 11,19" stroke="#7dd3fc" strokeWidth="0.7" fill="#FDBA74" fillOpacity="0.2" />
                {/* Sacred Dot at Base */}
                <circle cx="16" cy="27" r="1.5" fill="#FDBA74" />
              </g>
            ))}
          </g>

          {/* Sohrai Folk Antlered Forest Stag (Hiran) Outline Silhouette */}
          <g transform="translate(1310, 92)">
            {/* Sal Leaf / Grass Frond */}
            <path d="M 20,68 C 35,62 55,64 75,58" stroke="#EA580C" strokeWidth="0.9" fill="none" />
            <path d="M 32,64 Q 37,56 43,62 Q 37,67 32,64" stroke="#D97706" strokeWidth="0.8" fill="none" />
            <path d="M 52,60 Q 57,52 63,58 Q 57,63 52,60" stroke="#D97706" strokeWidth="0.8" fill="none" />

            {/* Stag Outline Body & Legs */}
            <path
              d="M 60,48 C 65,35 85,35 98,42 C 104,36 108,24 112,18 C 114,14 118,15 120,18 C 120,24 116,34 112,42 C 116,52 110,64 102,68 L 100,82 L 96,82 L 97,66 L 82,66 L 80,82 L 76,82 L 78,58 L 62,56 Z"
              stroke="#7dd3fc"
              strokeWidth="1.1"
              fill="none"
            />
            {/* Characteristic Branching Antlers (Sing) */}
            <path
              d="M 116,16 C 118,8 124,3 126,0 M 120,8 L 126,7 M 122,4 L 128,3"
              stroke="#FDBA74"
              strokeWidth="1.1"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 114,15 C 112,7 106,3 104,0 M 110,7 L 104,6 M 108,4 L 102,2"
              stroke="#FDBA74"
              strokeWidth="1.1"
              strokeLinecap="round"
              fill="none"
            />
            {/* Flank Chevron Ornamentation */}
            <path d="M 80,44 L 84,48 L 80,52" stroke="#EA580C" strokeWidth="0.8" fill="none" />
            <path d="M 86,43 L 90,47 L 86,51" stroke="#EA580C" strokeWidth="0.8" fill="none" />
            <path d="M 92,42 L 96,46 L 92,50" stroke="#EA580C" strokeWidth="0.8" fill="none" />
          </g>
        </g>

        {/* ========================================================================= */}
        {/* CENTRAL SAFE-ZONE (x: 200px to 1240px, y: 0 to 560px):                     */}
        {/* 100% PURE BACKGROUND GRADIENT — ZERO OVERLAP WITH TEXT & CONTROLS         */}
        {/* ========================================================================= */}

        {/* ========================================================================= */}
        {/* FULL-WIDTH HORIZON BAND (y >= 560px): NETARHAT/PATRATU HILLS & SAL FOREST */}
        {/* Situated behind the stakeholder cards section (15-20% opacity)            */}
        {/* ========================================================================= */}
        <g opacity="0.18">
          {/* Layer 1: Distant Netarhat Plateau Flat-Topped Mesas (Pats) & Rolling Ridges */}
          <path
            d="M 0,595 C 160,565 320,585 480,565 C 640,545 800,580 960,560 C 1120,540 1280,575 1440,565 L 1440,900 L 0,900 Z"
            fill="url(#netarhatPlateauGrad)"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />

          {/* Layer 2: Patratu Valley Rolling Hills & Ghat Slopes */}
          <path
            d="M 0,660 C 140,630 280,655 420,625 C 580,595 720,638 880,615 C 1040,595 1200,645 1340,630 C 1390,625 1420,635 1440,640 L 1440,900 L 0,900 Z"
            fill="url(#patratuValleyGrad)"
            stroke="#2dd4bf"
            strokeWidth="1.2"
          />

          {/* ===================================================================== */}
          {/* FULL-WIDTH SAL FOREST TREE LINE STRIP (Shorea robusta / Sarjom Sakhuwa) */}
          {/* Tall columnar trunks with characteristic clustered umbel crowns       */}
          {/* Spans the entire width from left to right as a continuous forest strip*/}
          {/* ===================================================================== */}
          <g stroke="#7dd3fc" strokeWidth="1" strokeLinecap="round" fill="none">
            {/* Sal Tree Helper Template Macro Instances across the full 1440 width */}
            
            {/* Cluster 1: West Ghats / Netarhat Approach (x: 25 to 200) */}
            <g transform="translate(35, 648)"><line x1="0" y1="0" x2="0" y2="-24" strokeWidth="1.2" /><path d="M -6,-12 L 0,-24 L 6,-12 M -9,-6 L 0,-17 L 9,-6" /><circle cx="0" cy="-26" r="3" fill="#38bdf8" fillOpacity="0.25" /></g>
            <g transform="translate(65, 642)"><line x1="0" y1="0" x2="0" y2="-28" strokeWidth="1.3" /><path d="M -7,-15 L 0,-28 L 7,-15 M -10,-8 L 0,-20 L 10,-8" /><circle cx="0" cy="-30" r="3.5" fill="#38bdf8" fillOpacity="0.25" /></g>
            <g transform="translate(95, 644)"><line x1="0" y1="0" x2="0" y2="-22" /><path d="M -5,-11 L 0,-22 L 5,-11 M -8,-5 L 0,-15 L 8,-5" /><circle cx="0" cy="-24" r="2.8" fill="#38bdf8" fillOpacity="0.25" /></g>
            <g transform="translate(125, 638)"><line x1="0" y1="0" x2="0" y2="-30" strokeWidth="1.3" /><path d="M -8,-16 L 0,-30 L 8,-16 M -11,-9 L 0,-22 L 11,-9" /><circle cx="0" cy="-32" r="3.8" fill="#38bdf8" fillOpacity="0.25" /></g>
            <g transform="translate(160, 635)"><line x1="0" y1="0" x2="0" y2="-25" /><path d="M -6,-13 L 0,-25 L 6,-13 M -9,-7 L 0,-18 L 9,-7" /><circle cx="0" cy="-27" r="3" fill="#38bdf8" fillOpacity="0.25" /></g>
            <g transform="translate(195, 630)"><line x1="0" y1="0" x2="0" y2="-27" strokeWidth="1.2" /><path d="M -7,-14 L 0,-27 L 7,-14 M -10,-7 L 0,-19 L 10,-7" /><circle cx="0" cy="-29" r="3.2" fill="#38bdf8" fillOpacity="0.25" /></g>

            {/* Cluster 2: Chotanagpur Plateau West Slope (x: 230 to 450) */}
            <g transform="translate(235, 626)"><line x1="0" y1="0" x2="0" y2="-24" /><path d="M -6,-12 L 0,-24 L 6,-12 M -8,-6 L 0,-17 L 8,-6" /></g>
            <g transform="translate(270, 620)"><line x1="0" y1="0" x2="0" y2="-30" strokeWidth="1.3" /><path d="M -8,-16 L 0,-30 L 8,-16 M -11,-9 L 0,-22 L 11,-9" /><circle cx="0" cy="-32" r="3.5" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(305, 615)"><line x1="0" y1="0" x2="0" y2="-26" /><path d="M -7,-13 L 0,-26 L 7,-13 M -9,-7 L 0,-18 L 9,-7" /></g>
            <g transform="translate(340, 618)"><line x1="0" y1="0" x2="0" y2="-28" strokeWidth="1.2" /><path d="M -7,-14 L 0,-28 L 7,-14 M -10,-8 L 0,-20 L 10,-8" /><circle cx="0" cy="-30" r="3.2" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(375, 612)"><line x1="0" y1="0" x2="0" y2="-31" strokeWidth="1.3" /><path d="M -8,-16 L 0,-31 L 8,-16 M -11,-9 L 0,-22 L 11,-9" /><circle cx="0" cy="-33" r="3.6" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(415, 608)"><line x1="0" y1="0" x2="0" y2="-25" /><path d="M -6,-13 L 0,-25 L 6,-13 M -9,-6 L 0,-18 L 9,-6" /></g>

            {/* Cluster 3: Patratu Valley Basin & Damodar Watershed (x: 460 to 720) */}
            <g transform="translate(460, 600)"><line x1="0" y1="0" x2="0" y2="-28" strokeWidth="1.2" /><path d="M -7,-14 L 0,-28 L 7,-14 M -10,-8 L 0,-20 L 10,-8" /><circle cx="0" cy="-30" r="3.2" fill="#2dd4bf" fillOpacity="0.2" /></g>
            <g transform="translate(495, 595)"><line x1="0" y1="0" x2="0" y2="-32" strokeWidth="1.4" /><path d="M -8,-17 L 0,-32 L 8,-17 M -12,-9 L 0,-24 L 12,-9" /><circle cx="0" cy="-34" r="4" fill="#2dd4bf" fillOpacity="0.25" /></g>
            <g transform="translate(530, 598)"><line x1="0" y1="0" x2="0" y2="-26" /><path d="M -6,-13 L 0,-26 L 6,-13 M -9,-7 L 0,-18 L 9,-7" /></g>
            <g transform="translate(565, 606)"><line x1="0" y1="0" x2="0" y2="-29" strokeWidth="1.2" /><path d="M -7,-15 L 0,-29 L 7,-15 M -10,-8 L 0,-21 L 10,-8" /><circle cx="0" cy="-31" r="3.4" fill="#2dd4bf" fillOpacity="0.2" /></g>
            <g transform="translate(605, 615)"><line x1="0" y1="0" x2="0" y2="-27" /><path d="M -7,-14 L 0,-27 L 7,-14 M -9,-7 L 0,-19 L 9,-7" /></g>
            <g transform="translate(645, 622)"><line x1="0" y1="0" x2="0" y2="-30" strokeWidth="1.3" /><path d="M -8,-16 L 0,-30 L 8,-16 M -11,-9 L 0,-22 L 11,-9" /><circle cx="0" cy="-32" r="3.5" fill="#2dd4bf" fillOpacity="0.2" /></g>
            <g transform="translate(685, 628)"><line x1="0" y1="0" x2="0" y2="-25" /><path d="M -6,-13 L 0,-25 L 6,-13 M -9,-6 L 0,-18 L 9,-6" /></g>

            {/* Cluster 4: Central Highlands & Subarnarekha Basin (x: 730 to 980) */}
            <g transform="translate(735, 626)"><line x1="0" y1="0" x2="0" y2="-28" strokeWidth="1.2" /><path d="M -7,-14 L 0,-28 L 7,-14 M -10,-8 L 0,-20 L 10,-8" /></g>
            <g transform="translate(775, 620)"><line x1="0" y1="0" x2="0" y2="-31" strokeWidth="1.3" /><path d="M -8,-16 L 0,-31 L 8,-16 M -11,-9 L 0,-22 L 11,-9" /><circle cx="0" cy="-33" r="3.6" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(815, 615)"><line x1="0" y1="0" x2="0" y2="-26" /><path d="M -6,-13 L 0,-26 L 6,-13 M -9,-7 L 0,-18 L 9,-7" /></g>
            <g transform="translate(855, 612)"><line x1="0" y1="0" x2="0" y2="-30" strokeWidth="1.3" /><path d="M -8,-16 L 0,-30 L 8,-16 M -11,-9 L 0,-22 L 11,-9" /><circle cx="0" cy="-32" r="3.5" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(895, 608)"><line x1="0" y1="0" x2="0" y2="-27" strokeWidth="1.2" /><path d="M -7,-14 L 0,-27 L 7,-14 M -10,-7 L 0,-19 L 10,-7" /></g>
            <g transform="translate(935, 602)"><line x1="0" y1="0" x2="0" y2="-32" strokeWidth="1.4" /><path d="M -8,-17 L 0,-32 L 8,-17 M -12,-9 L 0,-23 L 12,-9" /><circle cx="0" cy="-34" r="3.8" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(975, 600)"><line x1="0" y1="0" x2="0" y2="-26" /><path d="M -6,-13 L 0,-26 L 6,-13 M -9,-6 L 0,-18 L 9,-6" /></g>

            {/* Cluster 5: East Chotanagpur Plateau & Parasnath Slopes (x: 1010 to 1230) */}
            <g transform="translate(1015, 595)"><line x1="0" y1="0" x2="0" y2="-29" strokeWidth="1.3" /><path d="M -7,-15 L 0,-29 L 7,-15 M -10,-8 L 0,-21 L 10,-8" /><circle cx="0" cy="-31" r="3.4" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(1055, 592)"><line x1="0" y1="0" x2="0" y2="-33" strokeWidth="1.4" /><path d="M -9,-17 L 0,-33 L 9,-17 M -12,-9 L 0,-24 L 12,-9" /><circle cx="0" cy="-35" r="4" fill="#38bdf8" fillOpacity="0.25" /></g>
            <g transform="translate(1095, 602)"><line x1="0" y1="0" x2="0" y2="-26" /><path d="M -6,-13 L 0,-26 L 6,-13 M -9,-7 L 0,-18 L 9,-7" /></g>
            <g transform="translate(1135, 615)"><line x1="0" y1="0" x2="0" y2="-29" strokeWidth="1.2" /><path d="M -7,-14 L 0,-29 L 7,-14 M -10,-8 L 0,-21 L 10,-8" /><circle cx="0" cy="-31" r="3.2" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(1175, 626)"><line x1="0" y1="0" x2="0" y2="-27" /><path d="M -7,-14 L 0,-27 L 7,-14 M -9,-7 L 0,-19 L 9,-7" /></g>
            <g transform="translate(1215, 634)"><line x1="0" y1="0" x2="0" y2="-30" strokeWidth="1.3" /><path d="M -8,-16 L 0,-30 L 8,-16 M -11,-9 L 0,-22 L 11,-9" /><circle cx="0" cy="-32" r="3.5" fill="#38bdf8" fillOpacity="0.2" /></g>

            {/* Cluster 6: East Ridge Border Forest (x: 1250 to 1420) */}
            <g transform="translate(1255, 630)"><line x1="0" y1="0" x2="0" y2="-26" /><path d="M -6,-13 L 0,-26 L 6,-13 M -9,-6 L 0,-18 L 9,-6" /></g>
            <g transform="translate(1290, 625)"><line x1="0" y1="0" x2="0" y2="-31" strokeWidth="1.3" /><path d="M -8,-16 L 0,-31 L 8,-16 M -11,-9 L 0,-22 L 11,-9" /><circle cx="0" cy="-33" r="3.6" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(1325, 628)"><line x1="0" y1="0" x2="0" y2="-25" /><path d="M -6,-12 L 0,-25 L 6,-12 M -8,-6 L 0,-18 L 8,-6" /></g>
            <g transform="translate(1360, 635)"><line x1="0" y1="0" x2="0" y2="-29" strokeWidth="1.2" /><path d="M -7,-14 L 0,-29 L 7,-14 M -10,-8 L 0,-21 L 10,-8" /><circle cx="0" cy="-31" r="3.2" fill="#38bdf8" fillOpacity="0.2" /></g>
            <g transform="translate(1395, 638)"><line x1="0" y1="0" x2="0" y2="-24" /><path d="M -6,-12 L 0,-24 L 6,-12 M -8,-6 L 0,-17 L 8,-6" /></g>
          </g>

          {/* Layer 3: Foreground Chotanagpur Terraced Foothills & River Basin Transition */}
          <path
            d="M 0,735 C 240,705 480,740 720,710 C 960,680 1200,735 1440,705 L 1440,900 L 0,900 Z"
            fill="url(#chotanagpurRidgeGrad)"
            stroke="#60a5fa"
            strokeWidth="1"
          />

          {/* Traditional Sohrai River Wave Along Ground Line (y: 865 to 885) */}
          <path
            d="M 0,870 Q 30,858 60,870 T 120,870 T 180,870 T 240,870 T 300,870 T 360,870 T 420,870 T 480,870 T 540,870 T 600,870 T 660,870 T 720,870 T 780,870 T 840,870 T 900,870 T 960,870 T 1020,870 T 1080,870 T 1140,870 T 1200,870 T 1260,870 T 1320,870 T 1380,870 T 1440,870"
            stroke="#38bdf8"
            strokeWidth="1"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
