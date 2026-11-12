import React, { useState, useEffect, useRef } from 'react';
import { Platform, simulateTapPrecision } from '../utils/ergonomics';
import { SpecBadge } from './SpecBadge';
import { 
  Target, 
  Play, 
  RotateCcw, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Trophy, 
  Clock, 
  Activity 
} from 'lucide-react';

interface AccuracyBenchmarkProps {
  platform: Platform;
}

export const AccuracyBenchmark: React.FC<AccuracyBenchmarkProps> = ({ platform }) => {
  const [testMode, setTestMode] = useState<'48px' | '24px'>('48px');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [targetsRemaining, setTargetsRemaining] = useState<number>(10);
  const [hits, setHits] = useState<number>(0);
  const [misses, setMisses] = useState<number>(0);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [startTime, setStartTime] = useState<number>(0);
  const [targetAppearTime, setTargetAppearTime] = useState<number>(0);
  const [latencies, setLatencies] = useState<number[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const unit = platform === 'ios' ? 'pt' : platform === 'android' ? 'dp' : 'px';

  // Spawn new random target inside the test arena
  const spawnTarget = () => {
    // Keep target inside 15% to 85% to avoid clipping edges
    const x = Math.floor(Math.random() * 70) + 15;
    const y = Math.floor(Math.random() * 70) + 15;
    setTargetPos({ x, y });
    setTargetAppearTime(Date.now());
  };

  const startTest = (mode: '48px' | '24px') => {
    setTestMode(mode);
    setIsRunning(true);
    setCompleted(false);
    setHits(0);
    setMisses(0);
    setLatencies([]);
    setTargetsRemaining(10);
    setStartTime(Date.now());
    spawnTarget();
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isRunning) return;

    const latency = Date.now() - targetAppearTime;
    setLatencies((prev) => [...prev, latency]);
    setHits((prev) => prev + 1);

    if (targetsRemaining <= 1) {
      finishTest();
    } else {
      setTargetsRemaining((prev) => prev - 1);
      spawnTarget();
    }
  };

  const handleArenaMiss = (e: React.MouseEvent) => {
    if (!isRunning) return;
    setMisses((prev) => prev + 1);
  };

  const finishTest = () => {
    setIsRunning(false);
    setCompleted(true);
  };

  const avgLatency =
    latencies.length > 0
      ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
      : 0;

  const totalClicks = hits + misses;
  const accuracyPct = totalClicks > 0 ? Math.round((hits / totalClicks) * 100) : 100;

  const theoretical = simulateTapPrecision(testMode === '48px' ? 48 : 24);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Fat-Finger Hit Test Benchmark
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Test your tapping speed and miss rate on 48{unit} (Compliant) vs 24{unit} (Cramped) targets.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0F172A] border border-[#1E293B]">
          <button
            type="button"
            disabled={isRunning}
            onClick={() => startTest('48px')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              testMode === '48px'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Test 48{unit} Standard
          </button>
          <button
            type="button"
            disabled={isRunning}
            onClick={() => startTest('24px')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              testMode === '24px'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Test 24{unit} Cramped
          </button>
        </div>
      </div>

      {/* Main Benchmark Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INTERACTIVE ARENA (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">
                Mode: <strong className={testMode === '48px' ? 'text-emerald-400' : 'text-rose-400'}>{testMode}</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">
                Remaining: <strong className="text-white">{isRunning ? targetsRemaining : 10}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400">
                Hits: <strong className="text-emerald-400">{hits}</strong>
              </span>
              <span className="text-slate-400">
                Misses: <strong className="text-rose-400">{misses}</strong>
              </span>
            </div>
          </div>

          {/* Test Canvas Arena */}
          <div
            ref={containerRef}
            onClick={handleArenaMiss}
            className="relative w-full h-[380px] sm:h-[440px] rounded-2xl bg-[#0B0F19] border-2 border-[#1E293B] bg-dot-pattern overflow-hidden cursor-crosshair flex items-center justify-center select-none shadow-2xl"
          >
            {!isRunning && !completed && (
              <div className="text-center p-6 space-y-4 max-w-sm z-10 bg-[#0F172A]/90 backdrop-blur-md rounded-2xl border border-[#334155]">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Ready for Ergonomic Test?</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Tap the 10 targets as quickly and accurately as possible. Any tap outside the target logs an ergonomic miss!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => startTest(testMode)}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start 10-Target Benchmark</span>
                </button>
              </div>
            )}

            {isRunning && (
              <div
                onClick={handleTargetClick}
                style={{
                  top: `${targetPos.y}%`,
                  left: `${targetPos.x}%`,
                  width: testMode === '48px' ? '48px' : '24px',
                  height: testMode === '48px' ? '48px' : '24px',
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-lg animate-pulse ${
                  testMode === '48px'
                    ? 'bg-emerald-500 hover:bg-emerald-400 border-2 border-emerald-300 text-slate-950 shadow-emerald-500/40'
                    : 'bg-rose-500 hover:bg-rose-400 border border-rose-300 text-white shadow-rose-500/40'
                }`}
                aria-label="Benchmark tap target"
              >
                <div className={`rounded-full bg-white ${testMode === '48px' ? 'w-3 h-3' : 'w-1.5 h-1.5'}`} />
              </div>
            )}

            {completed && (
              <div className="text-center p-6 space-y-4 max-w-sm z-10 bg-[#0F172A]/95 backdrop-blur-md rounded-2xl border border-indigo-500/40">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Benchmark Complete!</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Mode: <strong className="text-indigo-400">{testMode}</strong> target
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-left font-mono text-xs">
                  <div className="p-2 rounded bg-[#0B0F19]">
                    <span className="text-[10px] text-slate-400 block">Accuracy</span>
                    <span className="text-sm font-bold text-emerald-400">{accuracyPct}%</span>
                  </div>
                  <div className="p-2 rounded bg-[#0B0F19]">
                    <span className="text-[10px] text-slate-400 block">Avg Latency</span>
                    <span className="text-sm font-bold text-indigo-400">{avgLatency} ms</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => startTest(testMode === '48px' ? '24px' : '48px')}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Compare with {testMode === '48px' ? '24px Cramped' : '48px Standard'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* METRICS & FITTS'S LAW COMPARISON (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>Scientific Ergonomic Baseline</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">48{unit} (WCAG AAA Target)</span>
                  <SpecBadge variant="do" size="sm">99.4% Hit Rate</SpecBadge>
                </div>
                <div className="w-full bg-[#1E293B] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '99.4%' }} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  Avg Acquisition: <strong>240ms</strong> • Fitts Index: 1.8
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">24{unit} (Cramped Target)</span>
                  <SpecBadge variant="dont" size="sm">74.2% Hit Rate</SpecBadge>
                </div>
                <div className="w-full bg-[#1E293B] h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '74.2%' }} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  Avg Acquisition: <strong>560ms</strong> • Fitts Index: 4.1 (+133% time)
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#1E293B] text-xs text-slate-300">
              <span className="font-semibold text-white">Why 48dp Matters: </span>
              <span>
                Fitts's Law dictates that target acquisition time is a function of distance and target size:
                <code className="text-[11px] font-mono text-indigo-300 block my-1">T = a + b * log2(2D / W)</code>
                Halving target width from 48px to 24px doubles aiming difficulty and triples missed taps.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
