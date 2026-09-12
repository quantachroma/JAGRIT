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
  ShieldCheck,
  Building2,
  MapPin,
  Calendar,
  Lock,
  Unlock,
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  Camera,
  Upload,
  ArrowRight,
  PartyPopper,
  Award,
  FileCheck,
  X,
  Volume2,
  Wrench,
  ChevronRight,
  Check,
  Info,
} from 'lucide-react';

export default function TimeMachinePage() {
  const { language } = useCitizen();

  // Time Machine Simulation State
  // Default is Day 15 (inside 45-day maturation buffer)
  const [simulatedDay, setSimulatedDay] = useState<number>(15);
  const isTimeMachineActive = simulatedDay >= 46;

  // Project Data
  const projectDetails = {
    id: 'JAG-2026-PAL-0052',
    title: 'Palamu Solar Defluoridation Unit',
    titleHi: 'पलामू सौर डी-फ्लोराइडेशन पेयजल इकाई',
    installedBy: 'BIT Mesra (Dept of Chemical & Environmental Engineering)',
    location: 'Palamu, Satbarwa Block, Dubbi Khurd',
    settlementPopulation: 850,
    quorumTarget: 42,
    deploymentDate: '28 July 2026',
    escrowTotal: '₹14,50,000',
    trancheStatus: 'Tranche 1 (30%) & Tranche 2 (40%) disbursed. Tranche 3 (30%) held pending Quorum & PESA NOC.',
  };

  // Voting & Tally State
  const [initialVotes, setInitialVotes] = useState(44);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteChoice, setVoteChoice] = useState<'YES' | 'NO' | 'PARTIAL' | null>(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [showEscalationSuccessModal, setShowEscalationSuccessModal] = useState(false);

  // Negative / Partial Feedback State (Task 1.3.3)
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photoPreviewName, setPhotoPreviewName] = useState<string | null>(null);
  const [defectSubcategory, setDefectSubcategory] = useState<string>('filter_leak');
  const [defectRemarks, setDefectRemarks] = useState<string>('');

  // Audio refs & canvas visualizer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Toggle helper for 1-click 5-second hackathon demo
  const handleToggleTimeMachine = (enable: boolean) => {
    if (enable) {
      setSimulatedDay(46);
    } else {
      setSimulatedDay(15);
      // Reset vote state if winding back clock
      setHasVoted(false);
      setVoteChoice(null);
      setAudioBlobUrl(null);
      setSelectedPhoto(null);
    }
  };

  // Audio Recording Animation & Timer
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 15) {
            // Auto stop at 15 seconds
            stopVoiceRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);

      // Start canvas audio visualizer
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

          // Animated sound wave lines
          ctx.beginPath();
          ctx.lineWidth = 2.5;
          const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
          grad.addColorStop(0, '#044728');
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
  }, [isRecording]);

  const startVoiceRecording = () => {
    setAudioBlobUrl(null);
    setAudioTranscript('');
    setIsRecording(true);
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    // Create simulated audio blob playback
    setAudioBlobUrl('simulated-voice-note.mp3');
    setAudioTranscript(
      'पानी का स्वाद हल्का खारा आ रहा है और सौर डिफ्लोराइडेशन फिल्टर वॉल्व से रिसाव हो रहा है।'
    );
  };

  const handlePhotoSelect = (presetName: string, label: string) => {
    setSelectedPhoto(presetName);
    setPhotoPreviewName(label);
  };

  // Handle Voting Submission
  const handleVoteSubmit = (choice: 'YES' | 'NO' | 'PARTIAL') => {
    setVoteChoice(choice);
    if (choice === 'YES') {
      setInitialVotes((prev) => prev + 1);
      setHasVoted(true);
      setShowCelebrationModal(true);
    }
  };

  // Handle Negative / Partial Escalation Submission
  const handleEscalationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasVoted(true);
    setShowEscalationSuccessModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* 1. TOP BANNER: Demo Time Machine Controller */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-700 text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-amber-300/40 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-950/40 text-amber-200 border border-amber-300/30 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Hackathon Simulation Engine
              </span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-mono font-bold">
                ADR-007
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>⚡ DEMO TIME MACHINE: Advance clock to Day 46 (Simulate Post-45 Days Deployment)</span>
            </h2>
            <p className="text-xs text-amber-100 max-w-xl leading-relaxed">
              {language === 'hi'
                ? 'हैकथॉन जूरी परीक्षण: 45 दिनों की अनिवार्य परिपक्वता अवधि को 5 सेकंड में सिमुलेट कर 14-दिवसीय ग्राम सभा सत्यापन मतदान खोलें।'
                : 'Simulate 45-day durability testing in 5 seconds to unlock the 14-day PESA Gram Sabha citizen verification voting window.'}
            </p>
          </div>

          {/* Interactive Fast-Forward Toggle Switch */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-black/25 p-3 rounded-xl border border-white/20 backdrop-blur-sm self-start lg:self-auto">
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-bold text-amber-200 block">
                Simulated Clock:
              </span>
              <span className="text-sm font-black font-mono text-white">
                {isTimeMachineActive ? 'Day 46 of 45 (Unlocked)' : `Day ${simulatedDay} of 45 (Locked)`}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleToggleTimeMachine(!isTimeMachineActive)}
              className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isTimeMachineActive ? 'bg-emerald-400' : 'bg-slate-400/60'
              }`}
              role="switch"
              aria-checked={isTimeMachineActive}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                  isTimeMachineActive ? 'translate-x-8 text-emerald-800' : 'translate-x-0 text-slate-500'
                }`}
              >
                {isTimeMachineActive ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </span>
            </button>

            {/* Quick One-Click Jump Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleToggleTimeMachine(false)}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                  !isTimeMachineActive
                    ? 'bg-white text-slate-900 shadow'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Day 15
              </button>
              <button
                type="button"
                onClick={() => handleToggleTimeMachine(true)}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all flex items-center gap-1 ${
                  isTimeMachineActive
                    ? 'bg-emerald-300 text-[#044728] shadow'
                    : 'bg-amber-400 text-slate-900 hover:bg-amber-300'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Day 46 ⚡</span>
              </button>
            </div>
          </div>
        </div>

        {/* Day Slider Bar */}
        <div className="mt-4 pt-3 border-t border-white/15 space-y-1.5">
          <div className="flex justify-between text-xs font-mono font-medium text-amber-100">
            <span>Day 1 (Deployed)</span>
            <span className="font-bold text-white bg-black/20 px-2 py-0.5 rounded">
              Current Simulation: Day {simulatedDay}
            </span>
            <span>Day 45 (Maturation)</span>
            <span className="text-emerald-200 font-bold">Day 46+ (Voting Window)</span>
          </div>
          <input
            type="range"
            min="1"
            max="60"
            value={simulatedDay}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSimulatedDay(val);
              if (val < 46) {
                setHasVoted(false);
                setVoteChoice(null);
              }
            }}
            className="w-full h-2.5 bg-black/30 rounded-lg appearance-none cursor-pointer accent-amber-300"
          />
        </div>
      </div>

      {/* 2. Deployed Project Overview Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#044728] flex items-center justify-center font-black text-xl">
              🚰
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                  {projectDetails.id}
                </span>
                <span className="text-[11px] bg-emerald-50 text-[#044728] font-bold px-2 py-0.5 rounded border border-emerald-200">
                  Stage 3 Deployment
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                {language === 'hi' ? projectDetails.titleHi : projectDetails.title}
              </h1>
            </div>
          </div>

          {/* Status Pill based on Time Machine State */}
          <div>
            {isTimeMachineActive ? (
              <span className="inline-flex items-center space-x-1.5 bg-emerald-100 text-[#044728] text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 animate-pulse">
                <Unlock className="w-3.5 h-3.5" />
                <span>14-Day Verification Window Active</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
                <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                <span>45-Day Maturation Buffer (Day {simulatedDay}/45)</span>
              </span>
            )}
          </div>
        </div>

        {/* Project Meta Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Installed By / HEI:</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
              <span className="truncate">{projectDetails.installedBy}</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Location &amp; Settlement:</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#044728] flex-shrink-0" />
              <span className="truncate">{projectDetails.location}</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Commissioning Date:</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>{projectDetails.deploymentDate}</span>
            </span>
          </div>
        </div>

        {/* Escrow Tranche 3 Notice */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start space-x-2">
          <Info className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold">ADR-006 Escrow Status: </span>
            <span>{projectDetails.trancheStatus}</span>
          </div>
        </div>
      </div>

      {/* 3. Task 1.3.2: Circular Quorum Gauge & Sentiment Breakdown */}
      <QuorumGauge
        population={projectDetails.settlementPopulation}
        quorumTarget={projectDetails.quorumTarget}
        votesLogged={initialVotes}
        operationalPassRate={88}
        cosmeticGrievanceRate={10}
        criticalDefectRate={2}
        cosmeticExample="Nalke ka handle thoda tight hai"
        criticalThreshold={30}
        language={language}
      />

      {/* 4. Task 1.3.1: 14-Day Citizen Verification Voting Card */}
      {!isTimeMachineActive ? (
        /* LOCKED STATE (Day < 46) */
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-[#D97706] mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {language === 'hi'
              ? '45-दिवसीय परिपक्वता बफ़र सक्रिय है — मतदान अभी बंद है'
              : '45-Day Maturation Buffer Active — Citizen Voting Locked'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {language === 'hi'
              ? `परियोजना को वास्तविक ग्रामीण परिस्थितियों में 45 दिनों तक बिना हस्तक्षेप के परखा जा रहा है (वर्तमान: दिन ${simulatedDay}/45)। मतदान दिवस 46 पर खुलेगा।`
              : `The solution is undergoing unassisted 45-day durability testing under real village conditions (Currently: Day ${simulatedDay} of 45). The 14-day voting window unlocks on Day 46.`}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleToggleTimeMachine(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#044728] to-emerald-700 hover:from-[#03361e] hover:to-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all hover:scale-[1.02] active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                {language === 'hi'
                  ? '⚡ टाइम मशीन चलाएं: दिन 46 पर जाएं (Simulate Day 46)'
                  : '⚡ Advance Time Machine to Day 46 (Simulate 45 Days)'}
              </span>
            </button>
          </div>
        </div>
      ) : hasVoted && voteChoice === 'YES' ? (
        /* VOTE RECORDED (AFFIRMATIVE) */
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#044728] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-[#044728]">
            {language === 'hi' ? 'सत्यापन वोट सफलतापूर्वक दर्ज!' : 'Verification Recorded Successfully!'}
          </h3>
          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            {language === 'hi'
              ? 'आपका सत्यापन मत ग्राम सभा पेसा कोरम में जोड़ दिया गया है। कुल 45/42 मतों के साथ 100% कोरम पूर्ण हो चुका है।'
              : 'Your affirmative vote has been logged into the PESA Act Gram Sabha ledger. 45 / 42 verified votes reached (100% quorum achieved).'}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowCelebrationModal(true)}
              className="inline-flex items-center space-x-2 bg-[#044728] text-white font-bold px-4 py-2 rounded-xl text-xs shadow hover:bg-[#03361e] transition-all"
            >
              <PartyPopper className="w-4 h-4 text-amber-300" />
              <span>View Celebration &amp; Escrow Release</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setHasVoted(false);
                setVoteChoice(null);
                setInitialVotes(44);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
            >
              Reset My Vote for Demo
            </button>
          </div>
        </div>
      ) : (
        /* UNLOCKED VOTING CARD (Day >= 46) */
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 sm:p-7 shadow-md space-y-6">
          {/* Card Header */}
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <div className="w-7 h-7 rounded-lg bg-[#044728] text-amber-300 flex items-center justify-center">
              <Vote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {language === 'hi'
                  ? 'स्क्रीन 8.3: 14-दिवसीय नागरिक सत्यापन मतदान (Citizen Satyapan)'
                  : 'Screen 8.3: 14-Day Citizen Verification Voting Card'}
              </h3>
              <p className="text-xs text-slate-500">
                Palamu Solar Defluoridation Unit &bull; Gram Sabha Verification
              </p>
            </div>
          </div>

          {/* Core Operational Question Check */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 text-center space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#044728] bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 inline-block">
              Core Operational Check &bull; मुख्य कार्यक्षमता प्रश्न
            </span>

            <h4 className="text-lg sm:text-xl font-black text-slate-900 max-w-xl mx-auto leading-snug">
              &quot;क्या चापाकल से अब पीने योग्य साफ पानी मिल रहा है?&quot;
            </h4>
            <p className="text-xs text-slate-600 italic">
              (Kya chapekal se ab peene yogya saaf paani mil raha hai?)
            </p>
          </div>

          {/* Interactive Decision Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. [ ✅ HAAN / YES ] */}
            <button
              type="button"
              onClick={() => handleVoteSubmit('YES')}
              className={`group p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center space-y-2 active:scale-95 ${
                voteChoice === 'YES'
                  ? 'border-[#044728] bg-emerald-50 text-[#044728] shadow-md'
                  : 'border-emerald-300 hover:border-[#044728] hover:bg-emerald-50/60 bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#044728] flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-sm font-black text-[#044728] tracking-wide">
                [ ✅ HAAN / YES ]
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                {language === 'hi'
                  ? 'हाँ, पानी पूरी तरह स्वच्छ व फ्लोराइड-मुक्त है'
                  : 'Water is clean, tested & satisfactory'}
              </span>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded mt-1">
                Closes Ticket &bull; Releases Tranche 3
              </span>
            </button>

            {/* 2. [ ⚠️ ANTHIK / PARTIALLY SOLVED ] */}
            <button
              type="button"
              onClick={() => handleVoteSubmit('PARTIAL')}
              className={`group p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center space-y-2 active:scale-95 ${
                voteChoice === 'PARTIAL'
                  ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-md'
                  : 'border-amber-200 hover:border-amber-500 hover:bg-amber-50/50 bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-sm font-black text-amber-800 tracking-wide">
                [ ⚠️ PARTIALLY SOLVED ]
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                {language === 'hi'
                  ? 'आंशिक समाधान (पानी आ रहा है पर फ्लोराइड गंध/कम प्रेशर)'
                  : 'Partially Solved (Drip/Minor Defect)'}
              </span>
              <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded mt-1">
                Opens Feedback Workflow
              </span>
            </button>

            {/* 3. [ ❌ NAHI / NO ] */}
            <button
              type="button"
              onClick={() => handleVoteSubmit('NO')}
              className={`group p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center space-y-2 active:scale-95 ${
                voteChoice === 'NO'
                  ? 'border-red-500 bg-red-50 text-red-900 shadow-md'
                  : 'border-red-200 hover:border-red-500 hover:bg-red-50/50 bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <XCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-black text-red-700 tracking-wide">
                [ ❌ NAHI / NO ]
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                {language === 'hi'
                  ? 'नहीं, पानी नहीं मिल रहा या इकाई बंद है'
                  : 'No, unit failed or water contaminated'}
              </span>
              <span className="text-[10px] text-red-700 font-bold bg-red-100 px-2 py-0.5 rounded mt-1">
                Triggers Repair Escalation
              </span>
            </button>
          </div>

          {/* 5. Task 1.3.3: Feedback Capture Workflow for Negative/Partial Votes */}
          {(voteChoice === 'NO' || voteChoice === 'PARTIAL') && (
            <form
              onSubmit={handleEscalationSubmit}
              className="mt-6 p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-5 animate-in fade-in duration-300"
            >
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                <Wrench className="w-5 h-5 text-[#D97706]" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {language === 'hi'
                      ? 'दोष विवरण एवं मौखिक प्रतिक्रिया दर्ज करें'
                      : 'Feedback Capture Workflow: Negative / Partial Vote'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    ADR-007 Quorum NLP Sentiment &bull; 45-Day Iterative Repair Sprint Trigger
                  </p>
                </div>
              </div>

              {/* 5.1 Inline Voice-Note Recorder Prompt */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        मौखिक शिकायत (Voice-Note Prompt):
                      </span>
                      <p className="text-xs font-semibold text-[#044728]">
                        &quot;कृपया 15 सेकंड में बताएं क्या दिक्कत आ रही है (बोल कर बताएं)&quot;
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    {recordingSeconds}s / 15s max
                  </span>
                </div>

                {/* Waveform Canvas */}
                <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-900 h-16 relative flex items-center justify-center">
                  <canvas ref={canvasRef} width={500} height={64} className="w-full h-full" />
                  {!isRecording && !audioBlobUrl && (
                    <span className="absolute text-xs text-slate-400 font-medium">
                      माइक दबाकर 15 सेकंड में अपनी बात कहें
                    </span>
                  )}
                </div>

                {/* Recorder Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startVoiceRecording}
                      className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition-all"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>{audioBlobUrl ? 'पुनः रिकॉर्ड करें (Re-record)' : 'रिकॉर्डिंग शुरू करें (Start 15s)'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopVoiceRecording}
                      className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition-all animate-pulse"
                    >
                      <Square className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>रिकॉर्डिंग समाप्त करें ({15 - recordingSeconds}s शेष)</span>
                    </button>
                  )}

                  {audioBlobUrl && (
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="inline-flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200"
                      >
                        {isPlayingAudio ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        <span>{isPlayingAudio ? 'रोकें' : 'सुनें (Play)'}</span>
                      </button>
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> ऑडियो रिकॉर्डेड
                      </span>
                    </div>
                  )}
                </div>

                {/* Simulated AI Speech-To-Text Output */}
                {audioTranscript && (
                  <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200 text-xs">
                    <span className="font-bold text-[#044728] block text-[11px]">
                      ASR Whisper / Bhashini Transcription:
                    </span>
                    <p className="text-slate-800 italic mt-0.5">&quot;{audioTranscript}&quot;</p>
                  </div>
                )}
              </div>

              {/* 5.2 Quick Photo Proof Uploader for Defective Parts */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      दोष फोटो साक्ष्य अपलोडर (Photo Proof Uploader):
                    </span>
                    <p className="text-[11px] text-slate-500">
                      खराब फिल्टर, पाइप या रिसाव की लाइव फोटो अपलोड करें अथवा त्वरित सैंपल चुनें
                    </p>
                  </div>
                </div>

                {/* Quick Presets for Demo */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handlePhotoSelect('filter_crack', 'Defluoridation filter housing crack / valve leak')
                    }
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      selectedPhoto === 'filter_crack'
                        ? 'border-[#044728] bg-emerald-50 text-[#044728] font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="block font-bold">💧 Filter Housing Crack</span>
                    <span className="text-[10px] text-slate-500 block truncate">Valve leak &amp; casing fissure</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handlePhotoSelect('solar_pump_low', 'Solar pump low pressure & battery discharge')
                    }
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      selectedPhoto === 'solar_pump_low'
                        ? 'border-[#044728] bg-emerald-50 text-[#044728] font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="block font-bold">⚡ Solar Inverter Fault</span>
                    <span className="text-[10px] text-slate-500 block truncate">Low output pressure</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handlePhotoSelect('turbid_water', 'High silt & fluoride taste effluent')
                    }
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      selectedPhoto === 'turbid_water'
                        ? 'border-[#044728] bg-emerald-50 text-[#044728] font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="block font-bold">🧪 Water Turbidity</span>
                    <span className="text-[10px] text-slate-500 block truncate">Effluent discolored</span>
                  </button>
                </div>

                {/* Selected Photo Confirmation */}
                {selectedPhoto && (
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#044728]" />
                      <span className="font-semibold text-slate-800">
                        साक्ष्य संलग्न: {photoPreviewName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPhoto(null)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* 5.3 Submit Escalation Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-300" />
                  <span>
                    {language === 'hi'
                      ? 'सुधार हेतु शिकायत दर्ज करें (Trigger 45-Day Iterative Repair Sprint)'
                      : 'Submit & Trigger 45-Day Iterative Repair Sprint (ADR-007)'}
                  </span>
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-1.5">
                  यह शिकायत सीधे BIT Mesra R&amp;D दल को 45-दिवसीय अनिवार्य मरम्मत हेतु प्रेषित की जाएगी।
                </p>
              </div>
            </form>
          )}
        </div>
      )}

      {/* 6. CELEBRATION MODAL FOR [ ✅ HAAN / YES ] */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 text-center animate-in zoom-in-95 duration-200 relative">
            <button
              type="button"
              onClick={() => setShowCelebrationModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Confetti & Icon */}
            <div className="relative mx-auto w-20 h-20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#044728] to-emerald-500 text-white flex items-center justify-center shadow-xl rotate-3">
                <PartyPopper className="w-10 h-10 text-amber-300 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#044728] bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Gram Sabha PESA Act Sign-off Achieved
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'hi' ? 'सत्यापन सफल — बधाई!' : 'Citizen Verification Successful!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'पलामू सौर डी-फ्लोराइडेशन पेयजल इकाई को 45/42 सत्यापित मतों (100% कोरम) के साथ पूर्णतः संतोषजनक घोषित किया गया है।'
                  : 'Palamu Solar Defluoridation Unit has achieved 100% Quorum (45 / 42 verified votes) with an 88% operational pass rate.'}
              </p>
            </div>

            {/* Institutional Payout & Academic Credits Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold border-b border-slate-200 pb-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Next Automated System Actions (ADR-006 &amp; ADR-008):</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#044728] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">Tranche 3 (30%) Escrow Release: </strong>
                    ₹4,35,000 final installment unlocked for BIT Mesra escrow account.
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#044728] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">APAAR Academic Credits: </strong>
                    2 NEP 2020 Capstone Credits deposited into participating engineering student transcripts.
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#044728] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">Ticket Status: </strong>
                    Marked <span className="font-bold text-[#044728]">RESOLVED</span> with cryptographic PESA Gram Sabha NOC stamp.
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCelebrationModal(false)}
              className="w-full bg-[#044728] hover:bg-[#03361e] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all"
            >
              सम्पूर्ण विवरण देखें (Close &amp; Continue)
            </button>
          </div>
        </div>
      )}

      {/* 7. REPAIR ESCALATION CONFIRMATION MODAL FOR [ ❌ NAHI / NO ] */}
      {showEscalationSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 text-center animate-in zoom-in-95 duration-200 relative">
            <button
              type="button"
              onClick={() => setShowEscalationSuccessModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 mx-auto flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full uppercase tracking-wider">
                ADR-007 Repair Sprint Triggered
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                मरम्मत एस्केलेशन सफलतापूर्वक प्रेषित!
              </h3>
              <p className="text-xs text-slate-600">
                आपकी मौखिक गवाही एवं फोटो साक्ष्य को पंजीकृत कर लिया गया है।
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left space-y-2 text-xs text-amber-900">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <Wrench className="w-4 h-4 text-amber-700" />
                <span>45-Day Iterative Repair SLA Directive:</span>
              </div>
              <p className="leading-relaxed">
                BIT Mesra छात्र इंजीनियरिंग दल को 48 घंटे के भीतर स्थल पर पहुंचकर वाल्व लीकेज एवं फिल्टर सुधार करने का निर्देश जारी कर दिया गया है। Tranche 3 अंतिम भुगतान मरम्मत पूर्ण होने तक रोक दिया गया है।
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowEscalationSuccessModal(false)}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all"
            >
              ठीक है (Acknowledge)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
