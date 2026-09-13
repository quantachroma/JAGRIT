'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Building2,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  HelpCircle,
  Maximize2,
  CheckCircle2,
  Cpu,
  Loader2,
  Layers,
  Award,
} from 'lucide-react';
import {
  aiClient,
  TriageResult,
  CopilotQueryResult,
  UniversityMatchResult,
} from '@/lib/ai-client';
import { useLanguage } from '@/context/LanguageContext';

export default function AIAssistantDrawer() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'triage' | 'copilot' | 'match'>('triage');
  const [isLoading, setIsLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [matchResult, setMatchResult] = useState<UniversityMatchResult | null>(null);
  const [copilotResult, setCopilotResult] = useState<CopilotQueryResult | null>(null);
  const [chatQuery, setChatQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string>('Ready');
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Quick Action 1: Test R&D Triage (Palamu Water)
  const handleTestPalamuWater = async () => {
    setIsLoading(true);
    setActiveTab('triage');
    setStatusMessage('Evaluating problem via Zero-Shot Triage Classifier...');
    try {
      const res = await aiClient.classifyTriage(
        'Severe High Fluoride & Arsenic Contamination in Palamu Groundwater',
        'Handpumps in 12 Anganwadi hamlets show 3.2 mg/L fluoride exceeding permissible limits, causing skeletal fluorosis in children. Requires non-electric nano-adsorption column filtration.',
        'Palamu'
      );
      setTriageResult(res);
      setStatusMessage('Classification complete: Broadcasted to State HEIs');
    } catch {
      setStatusMessage('Error connecting to AI service');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Action 2: Test Civic Routine (Ranchi Pothole)
  const handleTestRanchiPothole = async () => {
    setIsLoading(true);
    setActiveTab('triage');
    setStatusMessage('Checking civic routine keywords & municipal mapping...');
    try {
      const res = await aiClient.classifyTriage(
        'Dangerous deep pothole on Main Road near Albert Ekka Chowk',
        'Large crater and damaged sadak bitumen causing traffic slowdown and safety risk for two-wheelers. Urgent patching needed.',
        'Ranchi'
      );
      setTriageResult(res);
      setStatusMessage('Rerouted to Urban Local Body (RMC JharSewa)');
    } catch {
      setStatusMessage('Error connecting to AI service');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Action 3: Test 5-Axis University Match
  const handleTestUniversityMatch = async () => {
    setIsLoading(true);
    setActiveTab('match');
    setStatusMessage('Computing 5-axis capability match across Jharkhand HEIs...');
    try {
      const res = await aiClient.matchUniversities(
        'JAG-4102',
        'Fluoride & Arsenic Adsorption Rig for North Koel river basin',
        'Water Sanitation'
      );
      setMatchResult(res);
      setStatusMessage('Match scores calculated across 3 top HEIs');
    } catch {
      setStatusMessage('Error connecting to AI service');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Copilot Chat submission
  const handleCopilotSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatQuery.trim()) return;

    const query = chatQuery;
    setChatQuery('');
    setIsLoading(true);
    setActiveTab('copilot');
    setStatusMessage('Querying regional R&D repository & failure registry...');

    try {
      const res = await aiClient.queryCopilot(query);
      setCopilotResult(res);
      setStatusMessage('Synthesized local materials and historical warnings');
    } catch {
      setStatusMessage('Failed to query Copilot');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Compact AI assistant trigger */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
              aria-label="Open JAGRIT — Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society AI Copilot"
          className="group relative flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-full shadow-md border border-blue-300 active:scale-95 transition-all duration-200"
        >
          {/* Active Radar Pulse Ring */}
          <span className="text-base" aria-hidden="true">🤖</span>
          <span className="text-xs font-bold">{t.aiCopilotBtn}</span>
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity duration-200"
        />
      )}

      {/* Slide-over Drawer from Right */}
      <aside
        ref={drawerRef}
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-white shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="bg-[#1E3A8A] text-white px-6 py-4.5 border-b border-blue-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black tracking-wide text-white uppercase">
                  JAGRIT — Jharkhand Academia Industry Gateway for Research, Innovation and Transformation of Society AI Copilot
                </span>
                <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-400/30">
                  Live Microservice
                </span>
              </div>
              <p className="text-[11px] text-blue-100 font-medium">
                FastAPI Port 8000 • DHTE R&D Knowledge Engine
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Bar */}
        <div className="bg-slate-900 text-slate-300 px-6 py-2 text-xs flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isLoading ? 'bg-sky-400 animate-pulse' : 'bg-blue-400'
              }`}
            />
            <span className="font-mono text-[11px] truncate max-w-xs">{statusMessage}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">http://localhost:8000</span>
        </div>

        {/* Quick-Action Test Chips */}
        <div className="bg-slate-50 p-4 border-b border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Live AI Test Bench (Click to Trigger)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleTestPalamuWater}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E3A8A] border border-blue-200 hover:bg-blue-100 active:scale-95 transition-all duration-150 flex items-center space-x-1.5 shadow-2xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
              <span>Test R&D Triage (Palamu Water)</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleTestRanchiPothole}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100 active:scale-95 transition-all duration-150 flex items-center space-x-1.5 shadow-2xs"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Test Civic Routine (Ranchi Pothole)</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleTestUniversityMatch}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 active:scale-95 transition-all duration-150 flex items-center space-x-1.5 shadow-2xs"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Test University Match</span>
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            type="button"
            onClick={() => setActiveTab('triage')}
            className={`py-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'triage'
                ? 'border-[#1E3A8A] text-[#1E3A8A]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Triage Analysis
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('match')}
            className={`py-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'match'
                ? 'border-[#1E3A8A] text-[#1E3A8A]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            5-Axis Spider Match
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('copilot')}
            className={`py-2.5 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'copilot'
                ? 'border-[#1E3A8A] text-[#1E3A8A]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Materials & Warnings
          </button>
        </div>

        {/* Drawer Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <Loader2 className="w-8 h-8 text-[#1E3A8A] animate-spin mb-3" />
              <p className="text-sm font-medium">Querying microservice inference pipeline...</p>
              <p className="text-xs text-slate-400 mt-1">Executing zero-shot neural routing</p>
            </div>
          )}

          {/* TAB 1: TRIAGE RESULTS */}
          {!isLoading && activeTab === 'triage' && (
            <>
              {triageResult ? (
                <div className="space-y-4">
                  {/* Category Card */}
                  <div
                    className={`rounded-xl p-4 border ${
                      triageResult.category_type === 'HEI_RESEARCH'
                        ? 'bg-blue-50/70 border-blue-200'
                        : 'bg-sky-50/70 border-sky-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-black uppercase px-2.5 py-1 rounded-full ${
                          triageResult.category_type === 'HEI_RESEARCH'
                            ? 'bg-[#1E3A8A] text-white'
                            : 'bg-sky-600 text-white'
                        }`}
                      >
                        {triageResult.category_type === 'HEI_RESEARCH'
                          ? '🔬 Type B: HEI Applied R&D'
                          : '🛠️ Type A: Civic Routine'}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                        Confidence: {(triageResult.confidence * 100).toFixed(0)}%
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      Detected Domain: {triageResult.detected_domain}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {triageResult.explanation}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Automated Next Action:</span>
                      <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300">
                        {triageResult.action}
                      </span>
                    </div>
                  </div>

                  {/* HEI Specific Details */}
                  {triageResult.category_type === 'HEI_RESEARCH' && (
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600 uppercase">
                          Suggested State R&D Pool:
                        </span>
                        <span className="text-base font-black text-[#1E3A8A]">
                          ₹{triageResult.suggested_budget_pool_inr?.toLocaleString('en-IN') || '3,50,000'}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-700 block mb-1.5">
                          Recommended Qualified HEIs:
                        </span>
                        <div className="space-y-1.5">
                          {(triageResult.recommended_institutions || ['BIT Mesra', 'IIT ISM Dhanbad']).map(
                            (inst, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2 text-xs text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-100"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                                <span className="font-semibold">{inst}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Civic Routine Specific Notice */}
                  {triageResult.category_type === 'CIVIC_ROUTINE' && (
                    <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200 text-xs text-blue-900 space-y-2">
                      <div className="font-bold flex items-center space-x-1.5">
                        <Building2 className="w-4 h-4 text-blue-700" />
                        <span>Dispatched to Urban Local Body (ULB)</span>
                      </div>
                      <p className="text-blue-800 leading-relaxed">
                        This problem does not require academic prototyping. It has been routed directly to the Municipal Corporation maintenance queue with SLA timer under JharSewa.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <Cpu className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">Zero-Shot Triage Engine</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Click one of the test chips above to run zero-shot problem classification, domain detection, and HEI budget recommendation.
                  </p>
                </div>
              )}
            </>
          )}

          {/* TAB 2: 5-AXIS SPIDER MATCH */}
          {!isLoading && activeTab === 'match' && (
            <div className="space-y-4">
              {matchResult ? (
                matchResult.matched_universities.map((uni) => (
                  <div key={uni.university_id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{uni.name}</h4>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="text-[11px] text-slate-500">Overall Match:</span>
                          <span className="text-xs font-black text-[#1E3A8A]">{uni.overall_match_score}%</span>
                        </div>
                      </div>
                      <span className="bg-blue-100 text-[#1E3A8A] text-xs font-black px-2.5 py-1 rounded-full">
                        Tier 1 Fit
                      </span>
                    </div>

                    {/* 5-Axis Spider Bars */}
                    <div className="mt-3.5 space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-600 mb-0.5">
                          <span>NABL Labs Capability</span>
                          <span className="font-bold">{uni.spider_data.lab_capability}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1E3A8A] rounded-full"
                            style={{ width: `${uni.spider_data.lab_capability}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-600 mb-0.5">
                          <span>Faculty Patent Corpus</span>
                          <span className="font-bold">{uni.spider_data.faculty_patents}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1E3A8A] rounded-full"
                            style={{ width: `${uni.spider_data.faculty_patents}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-600 mb-0.5">
                          <span>Geographic Basin Proximity</span>
                          <span className="font-bold">{uni.spider_data.geographic_proximity}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{ width: `${uni.spider_data.geographic_proximity}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-600 mb-0.5">
                          <span>Deployed Track Record</span>
                          <span className="font-bold">{uni.spider_data.track_record}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1E3A8A] rounded-full"
                            style={{ width: `${uni.spider_data.track_record}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-600 mb-0.5">
                          <span>Student R&D Pool</span>
                          <span className="font-bold">{uni.spider_data.student_pool}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${uni.spider_data.student_pool}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Reasons */}
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                      {uni.explainability_reasons.map((r, i) => (
                        <p key={i} className="text-[11px] text-slate-600 flex items-start space-x-1.5">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{r}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <Layers className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">5-Axis University Matcher</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Click &ldquo;Test University Match&rdquo; to evaluate NABL labs, faculty patents, proximity, track record, and student pool.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REGIONAL MATERIALS & HISTORICAL FAILURES */}
          {!isLoading && activeTab === 'copilot' && (
            <div className="space-y-4">
              {copilotResult ? (
                <>
                  {/* Synthesis Answer */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center space-x-2 text-xs font-bold text-[#1E3A8A] uppercase mb-1">
                      <Sparkles className="w-4 h-4 text-sky-500" />
                      <span>R&D Synthesized Guidance</span>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-medium">
                      {copilotResult.answer}
                    </p>
                  </div>

                  {/* Recommended Regional Materials */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wide text-slate-700 flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-[#1E3A8A]" />
                      <span>Recommended Regional Materials (Jharkhand)</span>
                    </h5>
                    <div className="space-y-2">
                      {copilotResult.recommended_materials.map((mat, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-lg p-3 border border-slate-200 shadow-2xs text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{mat.name}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                              {mat.source_district}
                            </span>
                          </div>
                          <p className="text-blue-700 font-semibold text-[11px]">
                            {mat.estimated_cost_ratio}
                          </p>
                          <p className="text-slate-600 text-[11px]">{mat.efficacy}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Historical Failure Warnings */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wide text-sky-800 flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-sky-600" />
                      <span>Historical Failure Warnings</span>
                    </h5>
                    <div className="space-y-2">
                      {copilotResult.historical_failure_warnings.map((warn, i) => (
                        <div
                          key={i}
                          className="bg-sky-50/80 rounded-lg p-3 border border-sky-200 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between font-bold text-sky-950">
                            <span>{warn.historical_project}</span>
                            <span className="text-[10px] bg-sky-200 text-sky-900 px-1.5 py-0.5 rounded">
                              {warn.severity} RISK
                            </span>
                          </div>
                          <p className="text-slate-700 text-[11px]">
                            <span className="font-semibold text-blue-700">Observed: </span>
                            {warn.observed_failure}
                          </p>
                          <p className="text-slate-700 text-[11px]">
                            <span className="font-semibold text-blue-800">Preventive Rule: </span>
                            {warn.preventive_action}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <Lightbulb className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-700">R&D Materials & Failure Registry</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Type a query in the chat bar below (e.g., &ldquo;low cost fluoride filter&rdquo; or &ldquo;tribal lac storage desiccant&rdquo;) to pull local Jharkhand materials and historical failure warnings.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Bottom Chat Input */}
        <form
          onSubmit={handleCopilotSubmit}
          className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2"
        >
          <input
            type="text"
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            placeholder="Ask R&D Copilot (e.g. low cost fluoride filter)..."
            className="flex-1 bg-slate-50 text-slate-900 placeholder:text-slate-400 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !chatQuery.trim()}
            className="bg-[#1E3A8A] hover:bg-[#0F172A] disabled:opacity-50 text-white p-2.5 rounded-xl transition-all duration-150 active:scale-95 flex items-center justify-center shrink-0"
            aria-label="Send Copilot Query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </aside>
    </>
  );
}

