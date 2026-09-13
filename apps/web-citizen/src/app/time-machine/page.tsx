'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCitizen } from '@/context/CitizenContext';
import QuorumGauge from '@/components/quorum-gauge';
import {
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Vote,
  Building2,
  MapPin,
  Calendar,
  Lock,
  Unlock,
  Mic,
  Square,
  Play,
  Pause,
  Camera,
  X,
  Wrench,
  Check,
  Info,
  PartyPopper,
} from 'lucide-react';

export default function TimeMachinePage() {
  const { language, t } = useCitizen();

  // Time Machine Simulation State (Default Day 15)
  const [simulatedDay, setSimulatedDay] = useState<number>(15);
  const isTimeMachineActive = simulatedDay >= 46;

  // Project Details
  const projectDetails = {
    id: 'JAG-2026-PAL-0052',
    titleEn: 'Palamu Solar Defluoridation Unit',
    titleHi: 'पलामू सौर सोखता पेयजल इकाई',
    titleSat: 'ᱯᱟᱞᱟᱢᱩ ᱥᱮᱸᱜᱮᱞ ᱪᱟᱯᱟᱠᱚᱞ ᱠᱟᱹᱢᱤ',
    installedBy: 'BIT Mesra (Civil & Environmental Eng.)',
    location: 'Palamu, Satbarwa Block',
    settlementPopulation: 1230,
    quorumTarget: 43,
    deploymentDate: '28 July 2026',
    escrowTotal: '₹14,50,000',
  };

  const getProjectTitle = () => {
    if (language === 'hi') return projectDetails.titleHi;
    if (language === 'sat') return projectDetails.titleSat;
    return projectDetails.titleEn;
  };

  // Voting State: 46 / 43 votes logged (107% Quorum Met)
  const [initialVotes, setInitialVotes] = useState(46);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteChoice, setVoteChoice] = useState<'YES' | 'NO' | 'PARTIAL' | null>(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [showEscalationSuccessModal, setShowEscalationSuccessModal] = useState(false);

  // Negative Feedback State
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photoPreviewName, setPhotoPreviewName] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleToggleTimeMachine = (enable: boolean) => {
    if (enable) {
      setSimulatedDay(46);
    } else {
      setSimulatedDay(15);
      setHasVoted(false);
      setVoteChoice(null);
      setAudioBlobUrl(null);
      setSelectedPhoto(null);
    }
  };

  const stopVoiceRecording = React.useCallback(() => {
    setIsRecording(false);
    setAudioBlobUrl('simulated-voice-note.mp3');
    setAudioTranscript(
      language === 'hi'
        ? 'पानी का स्वाद हल्का खारा है और फिल्टर वॉल्व से थोड़ा रिसाव हो रहा है।'
        : language === 'sat'
        ? 'ᱫᱟᱜ ᱠᱷᱚᱱ ᱥᱤᱵᱤᱞ ᱵᱟᱝ ᱦᱤᱡᱩᱜ ᱠᱟᱱᱟ ᱟᱨ ᱯᱟᱭᱤᱯ ᱠᱷᱚᱱ ᱫᱟᱜ ᱡᱚᱨᱚᱜ ᱠᱟᱱᱟ᱾'
        : 'Water tastes slightly brackish and there is minor leakage around the filter valve.'
    );
  }, [language]);

  const startVoiceRecording = () => {
    setAudioBlobUrl(null);
    setAudioTranscript('');
    setIsRecording(true);
  };

  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 15) {
            stopVoiceRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        let phase = 0;
        const renderWave = () => {
          if (!ctx) return;
          phase += 0.15;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.beginPath();
          ctx.lineWidth = 2.5;
          const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
          grad.addColorStop(0, '#1d4ed8');
          grad.addColorStop(0.5, '#f59e0b');
          grad.addColorStop(1, '#10b981');
          ctx.strokeStyle = grad;

          const sliceWidth = canvas.width / 32;
          let x = 0;
          for (let i = 0; i < 32; i++) {
            const v = Math.sin(phase + i * 0.4) * (canvas.height * 0.35);
            const y = canvas.height / 2 + v;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            x += sliceWidth;
          }
          ctx.stroke();

          animationFrameRef.current = requestAnimationFrame(renderWave);
        };
        renderWave();
      }
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRecording, stopVoiceRecording]);

  const handleVoteSubmit = (choice: 'YES' | 'NO' | 'PARTIAL') => {
    setVoteChoice(choice);
    if (choice === 'YES') {
      setInitialVotes((prev) => prev + 1);
      setHasVoted(true);
      setShowCelebrationModal(true);
    }
  };

  const handleEscalationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasVoted(true);
    setShowEscalationSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* 1. TOP WARNING BAR: Amber Banner & Interactive Time Slider */}
      <div className="bg-amber-500/10 border-2 border-amber-400 text-amber-950 p-5 sm:p-6 rounded-3xl shadow-sm space-y-4 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                <span>DEMO CONTROLLER</span>
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-amber-950 flex items-center gap-2">
              <span>⚡ HACKATHON DEMO TIME MACHINE: Advance clock to Day 46 to simulate post-deployment community usage.</span>
            </h2>
            <p className="text-xs text-amber-800/90 max-w-xl leading-relaxed">
              {language === 'hi'
                ? '45-दिवसीय परिपक्वता अवधि को सेकंडों में सिमुलेट करें ताकि 14-दिवसीय ग्राम सभा नागरिक सत्यापन मतदान खिड़की खुल सके।'
                : language === 'sat'
                ? '᱔᱕ ᱢᱟᱦᱟᱸ ᱨᱮᱱᱟᱜ ᱵᱤᱰᱟᱹᱣ ᱥᱮᱠᱮᱱᱰ ᱨᱮ ᱪᱟᱞᱟᱣ ᱢᱮ ᱡᱮᱢᱚᱱ ᱑᱔ ᱢᱟᱦᱟᱸ ᱨᱮᱱᱟᱜ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱵᱷᱳᱴ ᱡᱷᱤᱡᱚᱜᱼᱟ᱾'
                : 'Scrub the timeline to fast-forward through village durability validation and unlock Gram Sabha voting.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => handleToggleTimeMachine(false)}
              className={`px-3.5 py-2 min-h-[48px] text-xs rounded-xl font-bold transition-all border active:scale-95 ${
                !isTimeMachineActive
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100/50'
              }`}
            >
              {language === 'hi' ? 'दिन 15 (तालाबंद)' : language === 'sat' ? '᱑᱕ ᱢᱟᱦᱟᱸ' : 'Day 15 (Locked)'}
            </button>
            <button
              type="button"
              onClick={() => handleToggleTimeMachine(true)}
              className={`px-4 py-2 min-h-[48px] text-xs rounded-xl font-bold transition-all flex items-center gap-1.5 border active:scale-95 ${
                isTimeMachineActive
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'hi' ? 'दिन 46 (खोलें)' : language === 'sat' ? '᱔᱖ ᱢᱟᱦᱟᱸ' : 'Day 46 (Unlocked)'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Time Slider: scrub from Day 0 through Day 45/46 */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-amber-300/80 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-amber-950">
            <span>
              {language === 'hi' ? 'टाइमलाइन स्क्रबर:' : language === 'sat' ? 'ᱚᱠᱛᱚ ᱥᱞᱟᱭᱰᱟᱨ:' : 'Interactive Time Slider:'}{' '}
              <span className="font-mono text-blue-700 font-black">
                {simulatedDay >= 46 ? 'Day 46 (Voting Window Open)' : `Day ${simulatedDay} of 45`}
              </span>
            </span>
            <span className="text-[11px] font-mono font-semibold text-amber-800">
              {simulatedDay >= 46 ? '14-Day Quorum Open' : 'Durability Maturation'}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="46"
            step="1"
            value={simulatedDay}
            onChange={(e) => setSimulatedDay(Number(e.target.value))}
            className="w-full h-2.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />

          {/* Milestone Indicators */}
          <div className="flex justify-between text-[10px] font-bold text-amber-900 pt-1">
            <span className="flex flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mb-0.5" />
              <span>Day 0</span>
              <span className="text-[9px] font-normal text-amber-700">Deploy</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-0.5" />
              <span>Day 15</span>
              <span className="text-[9px] font-normal text-amber-700">Initial Check</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mb-0.5" />
              <span>Day 30</span>
              <span className="text-[9px] font-normal text-amber-700">Midway Stress</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mb-0.5" />
              <span>Day 45</span>
              <span className="text-[9px] font-normal text-amber-700">Buffer End</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mb-0.5" />
              <span className="text-emerald-800 font-extrabold">Day 46+</span>
              <span className="text-[9px] font-bold text-emerald-700">Quorum Open</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Deployed Project Overview Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xl">
              🚰
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                  {projectDetails.id}
                </span>
                <span className="text-[11px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
                  {language === 'hi' ? 'चरण 3 परीक्षण' : language === 'sat' ? 'ᱦᱟᱹᱴᱤᱧ ᱓' : 'Stage 3 Deployment'}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                {getProjectTitle()}
              </h1>
            </div>
          </div>

          <div>
            {isTimeMachineActive ? (
              <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'hi' ? 'सत्यापन मतदान खुला' : language === 'sat' ? 'ᱵᱷᱳᱴ ᱡᱷᱤᱡ ᱮᱱᱟ' : '14-Day Verification Window Active'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 bg-amber-50 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'hi' ? `परिपक्वता अवधि (दिन ${simulatedDay}/45)` : language === 'sat' ? `ᱵᱤᱰᱟᱹᱣ ᱚᱠᱛᱚ (ᱢᱟᱦᱟᱸ ${simulatedDay}/᱔᱕)` : `45-Day Maturation Buffer (Day ${simulatedDay}/45)`}</span>
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">
              {language === 'hi' ? 'संबद्ध विश्वविद्यालय:' : language === 'sat' ? 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ:' : 'Installed By:'}
            </span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
              <span className="truncate">{projectDetails.installedBy}</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">
              {language === 'hi' ? 'स्थान:' : language === 'sat' ? 'ᱴᱷᱟᱶ:' : 'Location:'}
            </span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
              <span className="truncate">{projectDetails.location}</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">
              {language === 'hi' ? 'आरंभ तिथि:' : language === 'sat' ? 'ᱮᱦᱚᱵ ᱢᱟᱹᱦᱤᱛ:' : 'Commissioning Date:'}
            </span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              <span>{projectDetails.deploymentDate}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Circular Quorum Gauge */}
      <QuorumGauge
        population={projectDetails.settlementPopulation}
        quorumTarget={projectDetails.quorumTarget}
        votesLogged={initialVotes}
        operationalPassRate={88}
        cosmeticGrievanceRate={10}
        criticalDefectRate={2}
        language={language}
      />

      {/* 4. 14-Day Citizen Verification Voting Card */}
      {!isTimeMachineActive ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {language === 'hi'
              ? '45-दिवसीय परिपक्वता अवधि सक्रिय — मतदान अभी बंद है'
              : language === 'sat'
              ? '᱔᱕ ᱢᱟᱦᱟᱸ ᱵᱤᱰᱟᱹᱣ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ — ᱵᱷᱳᱴ ᱵᱚᱸᱫᱽ ᱜᱮᱭᱟ'
              : '45-Day Maturation Buffer Active — Voting Locked'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            {language === 'hi'
              ? `परियोजना को वास्तविक परिस्थितियों में 45 दिनों तक बिना हस्तक्षेप के परखा जा रहा है (वर्तमान: दिन ${simulatedDay}/45)। मतदान दिवस 46 पर खुलेगा।`
              : language === 'sat'
              ? `ᱟᱹᱛᱩ ᱨᱮ ᱔᱕ ᱢᱟᱦᱟᱸ ᱵᱤᱰᱟᱹᱣ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ᱾ ᱔᱖ ᱢᱟᱦᱟᱸ ᱨᱮ ᱵᱷᱳᱴ ᱡᱷᱤᱡᱚᱜ-ᱟ᱾`
              : `The solution is undergoing unassisted 45-day durability testing under village conditions. The 14-day voting window unlocks on Day 46.`}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleToggleTimeMachine(true)}
              className="inline-flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 min-h-[48px] rounded-2xl text-xs sm:text-sm shadow transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                {language === 'hi'
                  ? 'टाइम मशीन चलाएं (दिन 46 पर जाएं)'
                  : language === 'sat'
                  ? '᱔᱖ ᱢᱟᱦᱟᱸ ᱥᱮᱫ ᱪᱟᱞᱟᱜ ᱢᱮ'
                  : 'Advance Time Machine to Day 46'}
              </span>
            </button>
          </div>
        </div>
      ) : hasVoted && voteChoice === 'YES' ? (
        <div className="bg-white border-2 border-emerald-200 rounded-3xl p-6 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-emerald-800">
            {language === 'hi'
              ? 'सत्यापन वोट सफलतापूर्वक दर्ज!'
              : language === 'sat'
              ? 'ᱥᱟᱹᱨᱤᱭᱟᱹᱛ ᱵᱷᱳᱴ ᱥᱟᱹᱛ ᱮᱱᱟ!'
              : 'Verification Recorded Successfully!'}
          </h3>
          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            {language === 'hi'
              ? 'आपका सत्यापन मत ग्राम सभा कोरम में जोड़ दिया गया है। 100% कोरम पूर्ण हो चुका है।'
              : language === 'sat'
              ? 'ᱟᱢᱟᱜ ᱵᱷᱳᱴ ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱨᱮ ᱥᱮᱞᱮᱫ ᱮᱱᱟ᱾ ᱑᱐᱐% ᱠᱳᱨᱚᱢ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ᱾'
              : 'Your affirmative vote has been logged into the Gram Sabha ledger. 100% quorum achieved.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowCelebrationModal(true)}
              className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 min-h-[48px] rounded-xl text-xs shadow transition-all"
            >
              <PartyPopper className="w-4 h-4 text-white" />
              <span>{language === 'hi' ? 'अनुदान प्रमाण पत्र देखें' : language === 'sat' ? 'ᱥᱟᱹᱨᱤ ᱥᱟᱠᱟᱢ ᱧᱮᱞ ᱢᱮ' : 'View Approval & Escrow Release'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setHasVoted(false);
                setVoteChoice(null);
                setInitialVotes(44);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline min-h-[48px] px-3 flex items-center"
            >
              {t('timeMachine', 'resetDemo', 'Reset Simulation for Demo')}
            </button>
          </div>
        </div>
      ) : (
        /* UNLOCKED VOTING CARD (Day >= 46) */
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Vote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {language === 'hi'
                  ? 'नागरिक सत्यापन मतदान'
                  : language === 'sat'
                  ? 'ᱱᱟᱜᱟᱨᱤᱠ ᱥᱟᱹᱨᱤᱭᱟᱹᱛ ᱵᱷᱳᱴ'
                  : 'Citizen Verification Voting'}
              </h3>
            </div>
          </div>

          {/* Core Question */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-2">
            <h4 className="text-lg sm:text-xl font-black text-slate-900 max-w-xl mx-auto leading-snug">
              {t('timeMachine.coreQuestion') ||
                (language === 'hi'
                  ? 'क्या यह चापाकल अब सुरक्षित और स्वच्छ पेयजल प्रदान कर रहा है?'
                  : language === 'sat'
                  ? 'ᱪᱮᱫ ᱱᱚᱶᱟ ᱪᱟᱯᱟᱠᱚᱞ ᱠᱷᱚᱱ ᱱᱤᱛᱚᱜ ᱥᱟᱯᱷᱟ ᱟᱨ ᱥᱤᱵᱤᱞ ᱫᱟᱜ ᱧᱟᱢᱚᱜ ᱠᱟᱱᱟ?'
                  : 'Is the borewell now delivering safe, clean drinking water?')}
            </h4>
          </div>

          {/* Decision Buttons (Strict Single-Language) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. YES */}
            <button
              type="button"
              onClick={() => handleVoteSubmit('YES')}
              className={`p-4 min-h-[48px] rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 active:scale-95 ${
                voteChoice === 'YES'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                  : 'border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-sm font-black text-emerald-800">
                {t('timeMachine', 'yesButton', 'YES / WORKING')}
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                {t('timeMachine', 'yesDesc', 'Water is clean, tested, and fully satisfactory')}
              </span>
            </button>

            {/* 2. PARTIALLY WORKING */}
            <button
              type="button"
              onClick={() => handleVoteSubmit('PARTIAL')}
              className={`p-4 min-h-[48px] rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 active:scale-95 ${
                voteChoice === 'PARTIAL'
                  ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm'
                  : 'border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-sm font-black text-amber-800">
                {t('timeMachine', 'partialButton', 'PARTIALLY WORKING')}
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                {t('timeMachine', 'partialDesc', 'Partially solved with minor defect or lower pressure')}
              </span>
            </button>

            {/* 3. NO */}
            <button
              type="button"
              onClick={() => handleVoteSubmit('NO')}
              className={`p-4 min-h-[48px] rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 active:scale-95 ${
                voteChoice === 'NO'
                  ? 'border-red-500 bg-red-50 text-red-900 shadow-sm'
                  : 'border-slate-200 hover:border-red-500 hover:bg-red-50/50 bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-black text-red-700">
                {t('timeMachine', 'noButton', 'NO / BROKEN')}
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                {t('timeMachine', 'noDesc', 'Unit failed or water remains contaminated')}
              </span>
            </button>
          </div>

          {/* Feedback Capture Workflow for Negative/Partial Votes */}
          {(voteChoice === 'NO' || voteChoice === 'PARTIAL') && (
            <form
              onSubmit={handleEscalationSubmit}
              className="mt-6 p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-5 animate-in fade-in duration-300"
            >
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                <Wrench className="w-5 h-5 text-amber-600" />
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {language === 'hi'
                    ? 'दोष विवरण एवं मौखिक प्रतिक्रिया दर्ज करें'
                    : language === 'sat'
                    ? 'ᱠᱷᱟᱹᱢᱤ ᱞᱟᱹᱭ ᱥᱚᱫᱚᱨ ᱢᱮ'
                    : 'Feedback Capture Workflow'}
                </h4>
              </div>

              {/* Voice-Note Recorder */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mic className="w-4 h-4 text-blue-700" />
                    <span className="text-xs font-bold text-slate-800">
                      {language === 'hi'
                        ? 'कृपया 15 सेकंड में बोलकर बताएं क्या समस्या आ रही है'
                        : language === 'sat'
                        ? '᱑᱕ ᱴᱤᱯᱤᱡ ᱨᱮ ᱨᱚᱲ ᱠᱟᱛᱮ ᱞᱟᱹᱭ ᱢᱮ'
                        : 'Please explain in 15 seconds what issue you are facing'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {recordingSeconds}s / 15s
                  </span>
                </div>

                <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-900 h-14 relative flex items-center justify-center">
                  <canvas ref={canvasRef} width={500} height={56} className="w-full h-full" />
                </div>

                <div className="flex items-center justify-between">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startVoiceRecording}
                      className="bg-blue-700 text-white text-xs font-bold px-4 py-2.5 min-h-[48px] rounded-xl active:scale-95"
                    >
                      {language === 'hi' ? 'बोलना शुरू करें' : language === 'sat' ? 'ᱨᱚᱲ ᱮᱦᱚᱵ ᱢᱮ' : 'Start Recording'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopVoiceRecording}
                      className="bg-red-600 text-white text-xs font-bold px-4 py-2.5 min-h-[48px] rounded-xl active:scale-95"
                    >
                      {language === 'hi' ? 'रोकें' : language === 'sat' ? 'ᱵᱚᱸᱫᱽ ᱢᱮ' : 'Stop'}
                    </button>
                  )}

                  {audioTranscript && (
                    <span className="text-xs text-slate-700 italic max-w-xs truncate">
                      &quot;{audioTranscript}&quot;
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 min-h-[48px] rounded-xl shadow active:scale-95"
              >
                {language === 'hi'
                  ? 'सुधार हेतु शिकायत दर्ज करें'
                  : language === 'sat'
                  ? 'ᱥᱚᱞᱦᱮ ᱞᱟᱹᱜᱤᱫ ᱵᱷᱮᱡᱟᱭ ᱢᱮ'
                  : 'Submit for Re-engineering'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Celebration Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 text-center relative">
            <button
              type="button"
              onClick={() => setShowCelebrationModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-900">
                {language === 'hi'
                  ? 'सत्यापन स्वीकृत एवं कोरम पूर्ण!'
                  : language === 'sat'
                  ? 'ᱥᱟᱹᱨᱤᱭᱟᱹᱛ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ!'
                  : 'Quorum Reached & Verified!'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'पेसा ग्राम सभा की सहमति से परियोजना को अंतिम रूप से स्वीकृत कर दिया गया है।'
                  : language === 'sat'
                  ? 'ᱟᱹᱛᱩ ᱵᱟᱹᱭᱥᱤ ᱠᱚ ᱥᱟᱹᱨᱤ ᱠᱮᱫᱟ ᱟᱨ ᱠᱟᱹᱢᱤ ᱯᱩᱨᱟᱹᱣ ᱮᱱᱟ᱾'
                  : 'The installation has successfully passed the 45-day verification period with affirmative Gram Sabha consensus.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCelebrationModal(false)}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 min-h-[48px] rounded-2xl transition-all"
            >
              {language === 'hi' ? 'सम्पन्न' : language === 'sat' ? 'ᱥᱟᱹᱛ ᱮᱱᱟ' : 'Done'}
            </button>
          </div>
        </div>
      )}

      {/* Escalation Success Modal */}
      {showEscalationSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 text-center relative">
            <button
              type="button"
              onClick={() => setShowEscalationSuccessModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-900">
                {language === 'hi'
                  ? 'सुधार शिकायत दर्ज कर ली गई है'
                  : language === 'sat'
                  ? 'ᱥᱚᱞᱦᱮ ᱠᱷᱟᱹᱢᱤ ᱫᱟᱨᱡᱽ ᱮᱱᱟ'
                  : 'Re-engineering Notice Dispatched'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'आपकी प्रतिक्रिया सीधे शोध संस्थान को सुधार हेतु प्रेषित कर दी गई है।'
                  : language === 'sat'
                  ? 'ᱟᱢᱟᱜ ᱨᱚᱲ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱴᱷᱮᱱ ᱵᱷᱮᱡᱟ ᱮᱱᱟ᱾'
                  : 'Your defect feedback and recorded testimony have been routed directly to the university engineering lab.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowEscalationSuccessModal(false)}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 min-h-[48px] rounded-2xl transition-all"
            >
              {language === 'hi' ? 'सम्पन्न' : language === 'sat' ? 'ᱥᱟᱹᱛ ᱮᱱᱟ' : 'Done'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
