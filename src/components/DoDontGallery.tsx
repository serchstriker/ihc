import React, { useState } from 'react';
import { Platform } from '../utils/ergonomics';
import { RulerConfig } from '../types';
import { SpecBadge } from './SpecBadge';
import { RulerOverlay } from './RulerOverlay';
import { 
  Check, 
  X, 
  Trash2, 
  Edit3, 
  Share2, 
  Bookmark, 
  Send, 
  Heart, 
  Search, 
  CheckSquare, 
  Square,
  Code2,
  Copy,
  Info
} from 'lucide-react';

interface DoDontGalleryProps {
  platform: Platform;
  rulerConfig: RulerConfig;
}

export const DoDontGallery: React.FC<DoDontGalleryProps> = ({
  platform,
  rulerConfig,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [clickStats, setClickStats] = useState<Record<string, { hits: number; misses: number }>>({});
  const [checkboxState, setCheckboxState] = useState({ do: true, dont: false });
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'buttons' | 'icons' | 'inputs' | 'navigation'>('all');

  const unit = platform === 'ios' ? 'pt' : platform === 'android' ? 'dp' : 'px';
  const minTarget = platform === 'ios' ? 44 : 48;

  const registerClick = (key: string, isHit: boolean) => {
    setClickStats((prev) => {
      const current = prev[key] || { hits: 0, misses: 0 };
      return {
        ...prev,
        [key]: {
          hits: isHit ? current.hits + 1 : current.hits,
          misses: isHit ? current.misses : current.misses + 1,
        },
      };
    });
  };

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Touch Target Ergonomics: Do vs. Don't
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Comparing compliant {minTarget}{unit} physical touch targets against cramped anti-patterns.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F172A] border border-[#1E293B]">
          {(['all', 'icons', 'buttons', 'navigation', 'inputs'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                selectedFilter === cat
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* CASE 1: ICON BUTTON TOUCH EXPANSION */}
        {(selectedFilter === 'all' || selectedFilter === 'icons') && (
          <div className="rounded-2xl bg-[#0F172A] border border-[#1E293B] overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-semibold tracking-wide uppercase">
                  Pattern 01 • Action Icons
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Visual Icon vs. Physical Hit Target
                </h3>
              </div>
              <SpecBadge variant="spec">WCAG 2.2 SC 2.5.5 (AAA)</SpecBadge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1E293B]">
              
              {/* DO SIDE */}
              <div className="p-6 bg-[#131b2e]/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SpecBadge variant="do">DO: {minTarget}{unit} Target</SpecBadge>
                    <span className="text-xs font-mono text-emerald-400">Recommended</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Visual icon is 24px, but the touch container is expanded to {minTarget}×{minTarget}{unit} with centered flexbox. Zero fat-finger misclicks.
                  </p>

                  {/* Interactive Sandbox */}
                  <div className="p-8 rounded-xl bg-[#0B0F19] border border-[#1E293B] bg-grid-pattern flex flex-col items-center justify-center min-h-[160px] relative">
                    <RulerOverlay
                      width={minTarget}
                      height={minTarget}
                      unit={unit}
                      isCompliant={true}
                      config={rulerConfig}
                    >
                      <button
                        type="button"
                        onClick={() => registerClick('icon-do', true)}
                        className="w-12 h-12 rounded-xl bg-[#1E293B] hover:bg-indigo-600/30 text-white flex items-center justify-center border border-[#334155] hover:border-indigo-500 transition-all active:scale-95 cursor-pointer shadow-sm"
                        aria-label="Bookmark article (Recommended target)"
                      >
                        <Bookmark className="w-5 h-5 text-indigo-400" />
                      </button>
                    </RulerOverlay>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400">
                        Hits: <strong className="text-emerald-400">{clickStats['icon-do']?.hits || 0}</strong>
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        100% Acquisition
                      </span>
                    </div>
                  </div>
                </div>

                {/* Code Snippet Box */}
                <div className="mt-5 pt-4 border-t border-[#1E293B]/70">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span>Tailwind / React Implementation</span>
                    <button
                      type="button"
                      onClick={() =>
                        copyCode(
                          'code-1-do',
                          `<button className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800" aria-label="Bookmark">\n  <BookmarkIcon className="w-5 h-5" />\n</button>`
                        )
                      }
                      className="hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedId === 'code-1-do' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono p-3 rounded-lg bg-[#060e20] text-slate-300 overflow-x-auto border border-[#1E293B]">
                    <code>{`<button className="w-12 h-12 flex items-center justify-center">\n  <BookmarkIcon className="w-5 h-5" />\n</button>`}</code>
                  </pre>
                </div>
              </div>

              {/* DONT SIDE */}
              <div className="p-6 bg-[#1a1520]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SpecBadge variant="dont">DON'T: 24{unit} Cramped</SpecBadge>
                    <span className="text-xs font-mono text-rose-400">Anti-Pattern</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    The clickable area is restricted strictly to the 24px icon itself. Requires razor-sharp precision, causing frustrated taps and missed triggers.
                  </p>

                  {/* Interactive Sandbox */}
                  <div className="p-8 rounded-xl bg-[#0B0F19] border border-[#1E293B] bg-grid-pattern flex flex-col items-center justify-center min-h-[160px] relative">
                    <RulerOverlay
                      width={24}
                      height={24}
                      unit={unit}
                      isCompliant={false}
                      config={rulerConfig}
                    >
                      <button
                        type="button"
                        onClick={() => registerClick('icon-dont', false)}
                        className="w-6 h-6 p-0 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer active:scale-90"
                        aria-label="Bookmark article (Anti-pattern cramped target)"
                      >
                        <Bookmark className="w-6 h-6" />
                      </button>
                    </RulerOverlay>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400">
                        Miss clicks logged: <strong className="text-rose-400">{clickStats['icon-dont']?.misses || 0}</strong>
                      </span>
                      <span className="text-[11px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        High Fat-Finger Risk
                      </span>
                    </div>
                  </div>
                </div>

                {/* Code Snippet Box */}
                <div className="mt-5 pt-4 border-t border-[#1E293B]/70">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span>Defective Anti-Pattern</span>
                    <button
                      type="button"
                      onClick={() =>
                        copyCode('code-1-dont', `<button className="p-0 w-6 h-6">\n  <BookmarkIcon />\n</button>`)
                      }
                      className="hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedId === 'code-1-dont' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono p-3 rounded-lg bg-[#060e20] text-rose-300/80 overflow-x-auto border border-[#1E293B]">
                    <code>{`/* Defect: No touch padding around 24px icon */\n<button className="p-0 w-6 h-6">\n  <BookmarkIcon />\n</button>`}</code>
                  </pre>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CASE 2: CLUSTERED ACTIONS (ACCIDENTAL DESTRUCTIVE TAP) */}
        {(selectedFilter === 'all' || selectedFilter === 'navigation') && (
          <div className="rounded-2xl bg-[#0F172A] border border-[#1E293B] overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-semibold tracking-wide uppercase">
                  Pattern 02 • Spatial Separation
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Action Clustering &amp; Destruction Guarding
                </h3>
              </div>
              <SpecBadge variant="spec">Minimum 8{unit} Spacing Buffer</SpecBadge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1E293B]">
              
              {/* DO SIDE */}
              <div className="p-6 bg-[#131b2e]/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SpecBadge variant="do">DO: 12{unit} Separation</SpecBadge>
                    <span className="text-xs font-mono text-emerald-400">Protected</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Actions have distinct 48px hitboxes separated by a 12px dead zone. Prevents catastrophic accidental clicks on destructive commands.
                  </p>

                  <div className="p-8 rounded-xl bg-[#0B0F19] border border-[#1E293B] bg-grid-pattern flex flex-col items-center justify-center min-h-[160px]">
                    <div className="flex items-center gap-3">
                      <RulerOverlay
                        width={minTarget}
                        height={minTarget}
                        unit={unit}
                        isCompliant={true}
                        config={rulerConfig}
                      >
                        <button
                          type="button"
                          onClick={() => registerClick('cluster-edit', true)}
                          className="w-12 h-12 rounded-xl bg-[#1E293B] hover:bg-slate-700 text-slate-200 flex items-center justify-center border border-[#334155] transition-all cursor-pointer"
                          aria-label="Edit record"
                        >
                          <Edit3 className="w-5 h-5 text-indigo-400" />
                        </button>
                      </RulerOverlay>

                      <RulerOverlay
                        width={minTarget}
                        height={minTarget}
                        unit={unit}
                        isCompliant={true}
                        config={rulerConfig}
                      >
                        <button
                          type="button"
                          onClick={() => registerClick('cluster-share', true)}
                          className="w-12 h-12 rounded-xl bg-[#1E293B] hover:bg-slate-700 text-slate-200 flex items-center justify-center border border-[#334155] transition-all cursor-pointer"
                          aria-label="Share record"
                        >
                          <Share2 className="w-5 h-5 text-emerald-400" />
                        </button>
                      </RulerOverlay>

                      <RulerOverlay
                        width={minTarget}
                        height={minTarget}
                        unit={unit}
                        isCompliant={true}
                        config={rulerConfig}
                      >
                        <button
                          type="button"
                          onClick={() => registerClick('cluster-delete-safe', true)}
                          className="w-12 h-12 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 transition-all cursor-pointer"
                          aria-label="Delete record"
                        >
                          <Trash2 className="w-5 h-5 text-rose-400" />
                        </button>
                      </RulerOverlay>
                    </div>

                    <p className="mt-4 text-[11px] font-mono text-emerald-400">
                      ✓ Accidental adjacent tap probability: &lt; 0.1%
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1E293B]/70">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Ergonomic Rationale</span>
                  <p className="text-xs text-slate-300">
                    Human finger landing variance covers an 8-10mm circle. Without 8px spacing, up to 14% of taps touch the neighboring boundary.
                  </p>
                </div>
              </div>

              {/* DONT SIDE */}
              <div className="p-6 bg-[#1a1520]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SpecBadge variant="dont">DON'T: Cramped 2{unit} Gap</SpecBadge>
                    <span className="text-xs font-mono text-rose-400">Hazardous</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Buttons are packed tight with tiny 2px gaps. When aiming for "Edit", users frequently accidentally trigger irreversible "Delete".
                  </p>

                  <div className="p-8 rounded-xl bg-[#0B0F19] border border-[#1E293B] bg-grid-pattern flex flex-col items-center justify-center min-h-[160px]">
                    <div className="flex items-center gap-1 p-1 bg-[#1E293B] rounded-lg border border-rose-500/40">
                      <button
                        type="button"
                        onClick={() => registerClick('cluster-bad-edit', true)}
                        className="w-7 h-7 flex items-center justify-center text-slate-300 hover:bg-slate-700 rounded cursor-pointer"
                        title="Edit"
                        aria-label="Dangerous edit button"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => registerClick('cluster-bad-delete', false)}
                        className="w-7 h-7 flex items-center justify-center text-rose-400 hover:bg-rose-500/20 rounded cursor-pointer"
                        title="Delete (Cramped!)"
                        aria-label="Accidental delete button"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => registerClick('cluster-bad-share', true)}
                        className="w-7 h-7 flex items-center justify-center text-slate-300 hover:bg-slate-700 rounded cursor-pointer"
                        title="Share"
                        aria-label="Dangerous share button"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="mt-4 text-[11px] font-mono text-rose-400">
                      ⚠ Severe fat-finger cross-trigger risk (28px total span)
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1E293B]/70">
                  <span className="text-[11px] font-mono text-rose-400 block mb-1">Violation Metric</span>
                  <p className="text-xs text-slate-300">
                    Fails WCAG 2.2 Success Criterion 2.5.8 (Target Size Minimum) requirement of at least 24px + non-overlapping bounding radius.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CASE 3: FORM INPUT & PRIMARY BUTTON */}
        {(selectedFilter === 'all' || selectedFilter === 'inputs' || selectedFilter === 'buttons') && (
          <div className="rounded-2xl bg-[#0F172A] border border-[#1E293B] overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-semibold tracking-wide uppercase">
                  Pattern 03 • Form Controls
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Input Height &amp; Primary Action Buttons
                </h3>
              </div>
              <SpecBadge variant="spec">Height: 48px • Corner Radius: 12px</SpecBadge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1E293B]">
              
              {/* DO SIDE */}
              <div className="p-6 bg-[#131b2e]/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SpecBadge variant="do">DO: 48{unit} Form Control</SpecBadge>
                    <span className="text-xs font-mono text-emerald-400">Material / HIG Compliant</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Input field is 48px tall with 14px text and distinct focus glow. Primary button provides full 48px height with 20px horizontal padding.
                  </p>

                  <div className="p-6 rounded-xl bg-[#0B0F19] border border-[#1E293B] bg-grid-pattern space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Verification Code (48px input)
                      </label>
                      <RulerOverlay
                        width={280}
                        height={48}
                        unit={unit}
                        isCompliant={true}
                        config={rulerConfig}
                        className="w-full"
                      >
                        <input
                          type="text"
                          placeholder="e.g. 749-821"
                          className="w-full h-12 px-4 rounded-xl bg-[#0F172A] border border-[#334155] text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/25 transition-all"
                        />
                      </RulerOverlay>
                    </div>

                    <div>
                      <RulerOverlay
                        width={280}
                        height={48}
                        unit={unit}
                        isCompliant={true}
                        config={rulerConfig}
                        className="w-full"
                      >
                        <button
                          type="button"
                          onClick={() => registerClick('button-do', true)}
                          className="w-full h-12 px-5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold tracking-wide border border-white/15 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                        >
                          <Send className="w-4 h-4" />
                          <span>Confirm &amp; Validate Target</span>
                        </button>
                      </RulerOverlay>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1E293B]/70">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">WCAG 2.2 Target Size:</span>
                    <span className="text-emerald-400 font-semibold">48 × 48 px (AAA Pass)</span>
                  </div>
                </div>
              </div>

              {/* DONT SIDE */}
              <div className="p-6 bg-[#1a1520]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SpecBadge variant="dont">DON'T: 28{unit} Cramped Input</SpecBadge>
                    <span className="text-xs font-mono text-rose-400">Desktop Port Anti-Pattern</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Direct copy-paste of a 28px desktop input onto mobile. Thumbs easily miss the field and accidentally tap the page backdrop.
                  </p>

                  <div className="p-6 rounded-xl bg-[#0B0F19] border border-[#1E293B] bg-grid-pattern space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Cramped Field (28px input)
                      </label>
                      <RulerOverlay
                        width={280}
                        height={28}
                        unit={unit}
                        isCompliant={false}
                        config={rulerConfig}
                        className="w-full"
                      >
                        <input
                          type="text"
                          placeholder="Tiny desktop field..."
                          className="w-full h-7 px-2 text-xs rounded bg-[#0F172A] border border-rose-500/40 text-slate-300 focus:outline-none"
                        />
                      </RulerOverlay>
                    </div>

                    <div>
                      <RulerOverlay
                        width={280}
                        height={28}
                        unit={unit}
                        isCompliant={false}
                        config={rulerConfig}
                        className="w-full"
                      >
                        <button
                          type="button"
                          onClick={() => registerClick('button-dont', false)}
                          className="w-full h-7 text-xs font-medium rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Tiny Submit Button (28px)</span>
                        </button>
                      </RulerOverlay>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1E293B]/70">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Accessibility Deficit:</span>
                    <span className="text-rose-400 font-semibold">-20px below standard</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CASE 4: LIST ITEM CLICKABLE AREA */}
        {(selectedFilter === 'all' || selectedFilter === 'navigation') && (
          <div className="rounded-2xl bg-[#0F172A] border border-[#1E293B] overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-semibold tracking-wide uppercase">
                  Pattern 04 • List Rows &amp; Toggles
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Full-Width Tap Target vs. Tiny Checkbox
                </h3>
              </div>
              <SpecBadge variant="spec">Minimum Row Height: 52px</SpecBadge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1E293B]">
              
              {/* DO SIDE */}
              <div className="p-6 bg-[#131b2e]/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SpecBadge variant="do">DO: Entire Row is Clickable</SpecBadge>
                    <span className="text-xs font-mono text-emerald-400">Ergonomic Sweep</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Clicking anywhere across the entire 56px row toggles the selection. Thumbs can casually strike any part of the viewport width.
                  </p>

                  <div className="p-6 rounded-xl bg-[#0B0F19] border border-[#1E293B] bg-grid-pattern">
                    <RulerOverlay
                      width={300}
                      height={56}
                      unit={unit}
                      isCompliant={true}
                      config={rulerConfig}
                      className="w-full"
                    >
                      <button
                        type="button"
                        onClick={() => setCheckboxState((p) => ({ ...p, do: !p.do }))}
                        className="w-full h-14 px-4 rounded-xl bg-[#1E293B] hover:bg-slate-700/80 border border-[#334155] flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
                        aria-pressed={checkboxState.do}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            checkboxState.do ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-500'
                          }`}>
                            {checkboxState.do && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-sm font-medium text-white">Enable Tactile Haptic Specs</span>
                        </div>
                        <span className="text-xs font-mono text-emerald-400">56px Target</span>
                      </button>
                    </RulerOverlay>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1E293B]/70">
                  <p className="text-xs text-slate-300">
                    Natural reach success: <strong>99.8%</strong>. Zero visual hunt required for thumb alignment.
                  </p>
                </div>
              </div>

              {/* DONT SIDE */}
              <div className="p-6 bg-[#1a1520]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <SpecBadge variant="dont">DON'T: Checkbox Only Clickable</SpecBadge>
                    <span className="text-xs font-mono text-rose-400">Frustrating</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Clicking the text does nothing. Users must pinpoint the tiny 16px square, failing multiple times while walking or in motion.
                  </p>

                  <div className="p-6 rounded-xl bg-[#0B0F19] border border-[#1E293B] bg-grid-pattern">
                    <div className="w-full h-14 px-4 rounded-xl bg-[#1E293B]/40 border border-[#334155] flex items-center justify-between select-none">
                      <div className="flex items-center gap-3">
                        <RulerOverlay
                          width={16}
                          height={16}
                          unit={unit}
                          isCompliant={false}
                          config={rulerConfig}
                        >
                          <button
                            type="button"
                            onClick={() => setCheckboxState((p) => ({ ...p, dont: !p.dont }))}
                            className={`w-4 h-4 rounded flex items-center justify-center border cursor-pointer ${
                              checkboxState.dont ? 'bg-indigo-600 border-indigo-400 text-white' : 'border-rose-400/60'
                            }`}
                            aria-label="Tiny checkbox target"
                          >
                            {checkboxState.dont && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>
                        </RulerOverlay>
                        <span className="text-sm text-slate-400 cursor-not-allowed">
                          Label (Dead touch zone)
                        </span>
                      </div>
                      <span className="text-xs font-mono text-rose-400">16px Box</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1E293B]/70">
                  <p className="text-xs text-slate-300">
                    Fails Fitts's Law. Average acquisition latency increases from 240ms to 780ms.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
