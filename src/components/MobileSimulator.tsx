import React, { useState } from 'react';
import { Platform, evaluateThumbReach } from '../utils/ergonomics';
import { RulerConfig } from '../types';
import { SpecBadge } from './SpecBadge';
import { 
  Smartphone, 
  Flame, 
  HelpCircle, 
  Hand, 
  Search, 
  Plus, 
  Bell, 
  MoreVertical, 
  Compass, 
  Home, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sliders,
  ChevronRight
} from 'lucide-react';

interface MobileSimulatorProps {
  platform: Platform;
  rulerConfig: RulerConfig;
}

interface InspectableElement {
  id: string;
  name: string;
  type: string;
  yPct: number; // 0 to 1.0 from top of screen
  width: number;
  height: number;
  targetWidth: number;
  targetHeight: number;
  isCompliant: boolean;
  recommendation: string;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  platform,
  rulerConfig,
}) => {
  const [handMode, setHandMode] = useState<'right' | 'left'>('right');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [showZoneBorders, setShowZoneBorders] = useState<boolean>(true);
  const [selectedElement, setSelectedElement] = useState<InspectableElement>({
    id: 'fab',
    name: 'Primary Floating Action Button (FAB)',
    type: 'Floating Action Button',
    yPct: 0.84,
    width: 56,
    height: 56,
    targetWidth: 56,
    targetHeight: 56,
    isCompliant: true,
    recommendation: 'Positioned ideally inside the natural thumb sweep zone. Full 56dp hit area.',
  });

  const unit = platform === 'ios' ? 'pt' : platform === 'android' ? 'dp' : 'px';

  // Elements present on the phone mockup
  const screenElements: InspectableElement[] = [
    {
      id: 'header-back',
      name: 'Back Navigation Arrow',
      type: 'Icon Action',
      yPct: 0.08,
      width: 24,
      height: 24,
      targetWidth: 48,
      targetHeight: 48,
      isCompliant: true,
      recommendation: 'In the Hard-to-Reach zone. Should support edge-swipe gesture to avoid forcing top-corner reach.',
    },
    {
      id: 'header-menu',
      name: 'Overflow Options Menu',
      type: 'Icon Action',
      yPct: 0.08,
      width: 24,
      height: 24,
      targetWidth: 48,
      targetHeight: 48,
      isCompliant: true,
      recommendation: 'Requires two-handed reach or hand shift for one-handed users.',
    },
    {
      id: 'search-input',
      name: 'Search Bar Field',
      type: 'Text Field',
      yPct: 0.22,
      width: 320,
      height: 44,
      targetWidth: 320,
      targetHeight: 48,
      isCompliant: true,
      recommendation: 'In Stretch Zone. Consider moving search button to bottom bar on large phones.',
    },
    {
      id: 'chip-filter',
      name: 'Ergonomic Filter Chip',
      type: 'Filter Segment',
      yPct: 0.35,
      width: 90,
      height: 34,
      targetWidth: 90,
      targetHeight: 44,
      isCompliant: true,
      recommendation: 'Border height is 34px with 44px invisible vertical touch padding.',
    },
    {
      id: 'list-item-1',
      name: 'Design System Checklist Item',
      type: 'Interactive Row',
      yPct: 0.48,
      width: 330,
      height: 60,
      targetWidth: 330,
      targetHeight: 60,
      isCompliant: true,
      recommendation: 'Full-width 60px height. High thumb acquisition rate.',
    },
    {
      id: 'fab',
      name: 'Primary Floating Action Button (FAB)',
      type: 'Floating Action Button',
      yPct: 0.84,
      width: 56,
      height: 56,
      targetWidth: 56,
      targetHeight: 56,
      isCompliant: true,
      recommendation: 'Positioned ideally inside the natural thumb sweep zone. Full 56dp hit area.',
    },
    {
      id: 'bottom-nav-home',
      name: 'Bottom Nav Tab (Home)',
      type: 'Navigation Tab',
      yPct: 0.94,
      width: 70,
      height: 52,
      targetWidth: 70,
      targetHeight: 52,
      isCompliant: true,
      recommendation: 'Standard 52px height bottom navigation bar. Optimal ergonomic placement.',
    },
  ];

  const thumbAnalysis = evaluateThumbReach(selectedElement.yPct, handMode);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Mobile Ergonomics &amp; Thumb Reach Simulator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Simulating one-handed thumb arcs and safe touch target placement across mobile viewports.
          </p>
        </div>

        {/* Hand Toggle & Heatmap Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-[#0F172A] border border-[#1E293B]">
            <button
              type="button"
              onClick={() => setHandMode('left')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                handMode === 'left'
                  ? 'bg-[#1E293B] text-white border border-[#334155]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-pressed={handMode === 'left'}
            >
              <Hand className="w-3.5 h-3.5 transform -scale-x-100" />
              <span>Left Hand</span>
            </button>
            <button
              type="button"
              onClick={() => setHandMode('right')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                handMode === 'right'
                  ? 'bg-[#1E293B] text-white border border-[#334155]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-pressed={handMode === 'right'}
            >
              <Hand className="w-3.5 h-3.5" />
              <span>Right Hand</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              showHeatmap
                ? 'bg-indigo-600/25 border-indigo-500/50 text-indigo-300'
                : 'bg-[#0F172A] border-[#1E293B] text-slate-400'
            }`}
            aria-pressed={showHeatmap}
          >
            <Flame className="w-4 h-4 text-indigo-400" />
            <span>Thumb Heatmap</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Device Phone Mockup + Ergonomic Audit Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: REALISTIC DEVICE FRAME (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          {/* Phone Frame */}
          <div className="relative w-full max-w-[360px] sm:max-w-[380px] h-[720px] rounded-[48px] bg-[#060e20] p-3.5 border-4 border-[#334155] shadow-2xl shadow-indigo-950/40 select-none">
            
            {/* Dynamic Island / Speaker Pill */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#000000] rounded-full z-40 flex items-center justify-end px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a2e] border border-slate-700 mr-1" />
              <div className="w-2 h-2 rounded-full bg-indigo-900" />
            </div>

            {/* Inner Phone Screen */}
            <div className="relative w-full h-full rounded-[38px] bg-[#0B0F19] overflow-hidden flex flex-col justify-between border border-[#1E293B]">
              
              {/* TOP STATUS BAR */}
              <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-mono text-slate-400 z-30">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* OVERLAY: THUMB ERGONOMICS HEATMAP */}
              {showHeatmap && (
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                  {/* Radial thumb sweep gradient */}
                  <div
                    className="absolute w-[440px] h-[440px] rounded-full transition-all duration-300"
                    style={{
                      bottom: '-60px',
                      [handMode === 'right' ? 'right' : 'left']: '-100px',
                      background: `radial-gradient(circle, rgba(79, 70, 229, 0.45) 0%, rgba(16, 185, 129, 0.25) 45%, rgba(245, 158, 11, 0.15) 70%, transparent 85%)`,
                      filter: 'blur(16px)',
                    }}
                  />

                  {/* Horizontal zone dividers */}
                  {showZoneBorders && (
                    <>
                      <div className="absolute top-[32%] left-0 right-0 border-b border-rose-500/30 flex items-center justify-between px-3 py-0.5 text-[9px] font-mono text-rose-400 bg-rose-500/10">
                        <span>TOP 32% (HARD ZONE)</span>
                        <span>HYPER-EXTENSION</span>
                      </div>
                      <div className="absolute top-[55%] left-0 right-0 border-b border-amber-500/30 flex items-center justify-between px-3 py-0.5 text-[9px] font-mono text-amber-300 bg-amber-500/10">
                        <span>STRETCH ZONE (32% - 55%)</span>
                        <span>SECONDARY CONTROLS</span>
                      </div>
                      <div className="absolute bottom-[4%] left-0 right-0 flex items-center justify-between px-3 py-0.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/10">
                        <span>NATURAL SWEEP ZONE</span>
                        <span>PRIMARY CTAs</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* PHONE MOCKUP UI CONTENT */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 z-10">
                
                {/* 1. App Bar in Hard Zone */}
                <div className="flex items-center justify-between py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedElement(
                        screenElements.find((e) => e.id === 'header-back')!
                      )
                    }
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      selectedElement.id === 'header-back'
                        ? 'ring-2 ring-indigo-500 bg-indigo-600/30'
                        : 'bg-[#1E293B] text-slate-300 hover:text-white'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </button>

                  <div className="text-center">
                    <span className="text-xs font-semibold text-white block">Spec Workstation</span>
                    <span className="text-[10px] font-mono text-slate-400">Ergonomics Feed</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedElement(
                        screenElements.find((e) => e.id === 'header-menu')!
                      )
                    }
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      selectedElement.id === 'header-menu'
                        ? 'ring-2 ring-indigo-500 bg-indigo-600/30'
                        : 'bg-[#1E293B] text-slate-300 hover:text-white'
                    }`}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Search Input in Stretch Zone */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedElement(
                        screenElements.find((e) => e.id === 'search-input')!
                      )
                    }
                    className={`w-full h-11 px-3.5 rounded-xl bg-[#0F172A] border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                      selectedElement.id === 'search-input'
                        ? 'border-indigo-500 ring-2 ring-indigo-500/25 text-white'
                        : 'border-[#334155] text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-slate-400" />
                      <span>Search touch tokens...</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">48{unit}</span>
                  </button>
                </div>

                {/* 3. Horizontal Filter Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedElement(
                        screenElements.find((e) => e.id === 'chip-filter')!
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium shrink-0 transition-all cursor-pointer ${
                      selectedElement.id === 'chip-filter'
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                        : 'bg-[#1E293B] text-slate-300 border border-[#334155]'
                    }`}
                  >
                    48dp Standard
                  </button>
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#1E293B] text-slate-400 border border-[#334155] shrink-0">
                    WCAG AAA
                  </span>
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#1E293B] text-slate-400 border border-[#334155] shrink-0">
                    Safe Zones
                  </span>
                </div>

                {/* 4. Interactive List Item Rows (Natural Sweep Zone) */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedElement(
                        screenElements.find((e) => e.id === 'list-item-1')!
                      )
                    }
                    className={`w-full p-3.5 rounded-xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                      selectedElement.id === 'list-item-1'
                        ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20'
                        : 'bg-[#131b2e] border-[#1E293B] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">Full-Width Tap Target</h4>
                        <p className="text-[10px] text-slate-400">60px height • 100% natural reach</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <div className="w-full p-3.5 rounded-xl bg-[#131b2e] border border-[#1E293B] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">Dynamic Padding Mode</h4>
                        <p className="text-[10px] text-slate-400">Tactile haptic audit verified</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

              </div>

              {/* FLOATING ACTION BUTTON (In prime natural thumb zone) */}
              <div
                className="absolute z-30"
                style={{
                  bottom: '72px',
                  [handMode === 'right' ? 'right' : 'left']: '20px',
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setSelectedElement(
                      screenElements.find((e) => e.id === 'fab')!
                    )
                  }
                  className={`w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 border border-white/20 transition-all cursor-pointer active:scale-95 ${
                    selectedElement.id === 'fab' ? 'ring-4 ring-indigo-400' : ''
                  }`}
                  aria-label="Add new ergonomic rule"
                >
                  <Plus className="w-7 h-7" />
                </button>
              </div>

              {/* BOTTOM NAVIGATION BAR */}
              <div className="bg-[#0F172A] border-t border-[#1E293B] px-4 py-2 flex items-center justify-around z-30">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedElement(
                      screenElements.find((e) => e.id === 'bottom-nav-home')!
                    )
                  }
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    selectedElement.id === 'bottom-nav-home'
                      ? 'text-indigo-400'
                      : 'text-slate-400'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-[10px] font-mono">Home</span>
                </button>
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <Compass className="w-5 h-5" />
                  <span className="text-[10px] font-mono">Audit</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <Bell className="w-5 h-5" />
                  <span className="text-[10px] font-mono">Alerts</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <User className="w-5 h-5" />
                  <span className="text-[10px] font-mono">Profile</span>
                </div>
              </div>

              {/* Home indicator bar */}
              <div className="pb-1 pt-0.5 bg-[#0F172A] flex justify-center z-30">
                <div className="w-32 h-1 bg-slate-600 rounded-full" />
              </div>

            </div>
          </div>

          <p className="text-xs text-slate-400 font-mono mt-3 text-center">
            Click any component inside the phone to inspect ergonomic telemetry.
          </p>
        </div>

        {/* RIGHT COLUMN: ERGONOMIC AUDIT DIAGNOSTICS & METRICS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Element Inspector Card */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase font-semibold">
                  Element Inspector
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedElement.name}
                </h3>
              </div>
              <SpecBadge
                variant={
                  thumbAnalysis.zone === 'natural'
                    ? 'do'
                    : thumbAnalysis.zone === 'stretch'
                    ? 'warning'
                    : 'dont'
                }
              >
                {thumbAnalysis.title}
              </SpecBadge>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  Touch Target
                </span>
                <span className="text-base font-bold font-mono text-emerald-400">
                  {selectedElement.targetWidth} × {selectedElement.targetHeight}
                  <span className="text-xs ml-0.5 text-slate-400">{unit}</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  Screen Y-Position
                </span>
                <span className="text-base font-bold font-mono text-indigo-400">
                  {Math.round(selectedElement.yPct * 100)}%
                  <span className="text-xs ml-0.5 text-slate-400">from top</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  Thumb Comfort
                </span>
                <span className={`text-base font-bold font-mono ${
                  thumbAnalysis.comfortScore >= 80
                    ? 'text-emerald-400'
                    : thumbAnalysis.comfortScore >= 50
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}>
                  {thumbAnalysis.comfortScore}/100
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  WCAG Rating
                </span>
                <span className="text-base font-bold font-mono text-white">
                  {selectedElement.isCompliant ? 'AAA PASS' : 'AA MIN'}
                </span>
              </div>
            </div>

            {/* Pedagogical Description */}
            <div className="mt-6 p-4 rounded-xl bg-[#131b2e] border border-[#1E293B]">
              <h4 className="text-xs font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ergonomic Diagnostic Rationale:</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {thumbAnalysis.description}
              </p>
              <div className="mt-3 pt-3 border-t border-[#1E293B] text-xs text-indigo-300 font-mono">
                💡 <strong>Architect Recommendation:</strong> {selectedElement.recommendation}
              </div>
            </div>

          </div>

          {/* Educational Safe Zone Breakdown */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Mobile One-Handed Thumb Ergonomics</span>
              <SpecBadge variant="spec">Steven Hoober Rules</SpecBadge>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-emerald-500/20 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-400">
                    Lower 55% Screen Height (Natural Thumb Sweep)
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    75% of one-handed smartphone interactions occur here. Reserve this zone for primary inputs, floating action buttons, sheet controls, and bottom navigation.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-amber-500/20 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-300">
                    Middle 32% - 55% (Moderate Thumb Stretch)
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Accessible with modest thumb joint extension. Well-suited for feed scroll cards, segmented chips, secondary buttons, and media players.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-rose-500/20 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  <XCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-400">
                    Top 32% (Hard-to-Reach Zone / Two-Handed Shift)
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Forcing single-handed users to tap here causes phone drops and hand strain. Use strictly for read-only headings, brand logos, or status telemetry.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
