import React, { useState } from 'react';
import { Platform, evaluateTouchTarget, calculateContrastRatio } from '../utils/ergonomics';
import { RulerConfig } from '../types';
import { SpecBadge } from './SpecBadge';
import { RulerOverlay } from './RulerOverlay';
import { 
  Sliders, 
  Code2, 
  Copy, 
  Check, 
  ShieldCheck, 
  ShieldAlert, 
  Smartphone, 
  Layers, 
  Palette,
  Sparkles,
  RefreshCw,
  Bookmark
} from 'lucide-react';

interface TargetBuilderProps {
  platform: Platform;
  rulerConfig: RulerConfig;
}

export const TargetBuilder: React.FC<TargetBuilderProps> = ({
  platform,
  rulerConfig,
}) => {
  // Configurable component dimensions
  const [visualWidth, setVisualWidth] = useState<number>(24);
  const [visualHeight, setVisualHeight] = useState<number>(24);
  const [touchPadding, setTouchPadding] = useState<number>(12);
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [label, setLabel] = useState<string>('Save Spec');
  const [activeCodeTab, setActiveCodeTab] = useState<'tailwind' | 'swiftui' | 'compose' | 'css'>('tailwind');
  const [copied, setCopied] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  // Colors for contrast testing
  const [textColor, setTextColor] = useState<string>('#F8FAFC');
  const [bgColor, setBgColor] = useState<string>('#4F46E5');

  const unit = platform === 'ios' ? 'pt' : platform === 'android' ? 'dp' : 'px';

  // Total touch target size
  const totalTargetWidth = visualWidth + touchPadding * 2;
  const totalTargetHeight = visualHeight + touchPadding * 2;

  // Audit evaluation
  const audit = evaluateTouchTarget(totalTargetWidth, totalTargetHeight, platform);
  const contrastRatio = calculateContrastRatio(textColor, bgColor);

  // Code generation
  const getTailwindCode = () => {
    return `// React + Tailwind CSS with Accessible Touch Padding
export function AccessibleAction() {
  return (
    <button
      type="button"
      className="relative p-[${touchPadding}px] flex items-center justify-center rounded-[${borderRadius}px] text-[${textColor}] bg-[${bgColor}] min-w-[${audit.width}px] min-h-[${audit.height}px] focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all active:scale-95"
      aria-label="${label}"
    >
      ${showIcon ? `<BookmarkIcon className="w-[${visualWidth}px] h-[${visualHeight}px]" />` : ''}
      ${label ? `<span className="text-xs font-medium ml-2">${label}</span>` : ''}
    </button>
  );
}`;
  };

  const getSwiftUICode = () => {
    return `// SwiftUI with HIG 44pt Touch Expansion
struct AccessibleButton: View {
    var body: some View {
        Button(action: { /* action */ }) {
            HStack(spacing: 8) {
                ${showIcon ? `Image(systemName: "bookmark.fill")\n                    .frame(width: ${visualWidth}, height: ${visualHeight})` : ''}
                Text("${label}")
                    .font(.footnote)
            }
            .foregroundColor(Color(hex: "${textColor}"))
            .padding(${touchPadding})
            .frame(minWidth: ${totalTargetWidth}, minHeight: ${totalTargetHeight})
            .background(Color(hex: "${bgColor}"))
            .clipShape(RoundedRectangle(cornerRadius: ${borderRadius}))
        }
        .contentShape(Rectangle()) // Ensures entire bounding box is clickable
    }
}`;
  };

  const getComposeCode = () => {
    return `// Jetpack Compose with Material 3 48dp Minimum Touch Target
@Composable
fun AccessibleActionButton(onClick: () -> Unit) {
    IconButton(
        onClick = onClick,
        modifier = Modifier
            .sizeIn(minWidth = ${totalTargetWidth}.dp, minHeight = ${totalTargetHeight}.dp)
            .padding(${touchPadding}.dp)
            .background(
                color = Color(android.graphics.Color.parseColor("${bgColor}")),
                shape = RoundedCornerShape(${borderRadius}.dp)
            )
    ) {
        ${showIcon ? `Icon(\n            imageVector = Icons.Default.Bookmark,\n            contentDescription = "${label}",\n            tint = Color(android.graphics.Color.parseColor("${textColor}"))\n        )` : ''}
    }
}`;
  };

  const getCSSCode = () => {
    return `/* Modern CSS coarse-pointer target enlargement */
.touch-target-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${touchPadding}px;
  min-width: ${totalTargetWidth}px;
  min-height: ${totalTargetHeight}px;
  background-color: ${bgColor};
  color: ${textColor};
  border-radius: ${borderRadius}px;
}

@media (pointer: coarse) {
  /* On touchscreens, force minimum 48px target */
  .touch-target-action {
    min-width: max(${totalTargetWidth}px, 48px);
    min-height: max(${totalTargetHeight}px, 48px);
  }
}`;
  };

  const currentCode =
    activeCodeTab === 'tailwind'
      ? getTailwindCode()
      : activeCodeTab === 'swiftui'
      ? getSwiftUICode()
      : activeCodeTab === 'compose'
      ? getComposeCode()
      : getCSSCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Touch Target Audit Lab &amp; Code Exporter
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Experiment with visual dimensions and invisible touch padding to achieve instant WCAG 2.2 AAA compliance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setVisualWidth(24);
            setVisualHeight(24);
            setTouchPadding(12);
            setBorderRadius(12);
            setLabel('Save Spec');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#0F172A] border border-[#1E293B] text-slate-300 hover:text-white cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset to 48{unit} Default</span>
        </button>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: LIVE CONTROLS & SLIDERS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Target Geometry Controls</span>
            </h3>

            {/* Slider 1: Visual Icon Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Visual Core Size</span>
                <span className="text-indigo-400 font-semibold">{visualWidth} × {visualHeight}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="48"
                step="2"
                value={visualWidth}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setVisualWidth(val);
                  setVisualHeight(val);
                }}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500">The visible glyph or icon dimension.</span>
            </div>

            {/* Slider 2: Invisible Touch Padding */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Touch Target Padding</span>
                <span className="text-emerald-400 font-semibold">+{touchPadding * 2}px ({touchPadding}px per side)</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="2"
                value={touchPadding}
                onChange={(e) => setTouchPadding(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500">
                Invisible bounding area that registers taps without cluttering the screen.
              </span>
            </div>

            {/* Slider 3: Corner Radius */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Border Radius</span>
                <span className="text-slate-300 font-semibold">{borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="28"
                step="2"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Label input */}
            <div className="space-y-1.5 pt-2 border-t border-[#1E293B]">
              <label className="block text-xs font-mono text-slate-300">
                Accessible Button Label
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Button label..."
                className="w-full h-10 px-3 rounded-lg bg-[#0B0F19] border border-[#334155] text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Color Swatches for Contrast Test */}
            <div className="space-y-2 pt-2 border-t border-[#1E293B]">
              <span className="block text-xs font-mono text-slate-300">
                Color Palette &amp; Contrast
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Background:</span>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Foreground:</span>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: LIVE INTERACTIVE PREVIEW & AUDIT REPORT (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Live Preview Canvas */}
          <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl flex flex-col items-center justify-center min-h-[260px] bg-grid-pattern relative">
            <div className="absolute top-4 left-4">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Interactive Touch Canvas
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <SpecBadge variant={audit.isCompliant ? 'do' : 'dont'}>
                {audit.width} × {audit.height} {unit}
              </SpecBadge>
            </div>

            {/* The Target Under Test */}
            <div className="my-8">
              <RulerOverlay
                width={audit.width}
                height={audit.height}
                unit={unit}
                isCompliant={audit.isCompliant}
                config={rulerConfig}
              >
                <button
                  type="button"
                  onClick={() => setClickCount((c) => c + 1)}
                  style={{
                    padding: `${touchPadding}px`,
                    borderRadius: `${borderRadius}px`,
                    backgroundColor: bgColor,
                    color: textColor,
                    minWidth: `${totalTargetWidth}px`,
                    minHeight: `${totalTargetHeight}px`,
                  }}
                  className="flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg border border-white/10"
                >
                  {showIcon && (
                    <Bookmark
                      style={{ width: `${visualWidth}px`, height: `${visualHeight}px` }}
                      className="shrink-0"
                    />
                  )}
                  {label && <span className="text-xs font-semibold">{label}</span>}
                </button>
              </RulerOverlay>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>
                Simulated Taps: <strong className="text-white">{clickCount}</strong>
              </span>
              <span>•</span>
              <span className={audit.isCompliant ? 'text-emerald-400' : 'text-rose-400'}>
                {audit.summary}
              </span>
            </div>
          </div>

          {/* Audit Telemetry Panel */}
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>WCAG 2.2 Compliance Scorecard</span>
              </h3>
              <SpecBadge variant={audit.wcagLevel === 'AAA' ? 'do' : audit.wcagLevel === 'AA' ? 'warning' : 'dont'}>
                WCAG {audit.wcagLevel}
              </SpecBadge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  WCAG SC 2.5.5 (AAA)
                </span>
                <span className={`text-sm font-bold font-mono ${audit.width >= 48 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {audit.width >= 48 ? '✓ PASSED (≥48px)' : '✕ FAILED (<48px)'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  WCAG SC 2.5.8 (AA)
                </span>
                <span className={`text-sm font-bold font-mono ${audit.width >= 24 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {audit.width >= 24 ? '✓ PASSED (≥24px)' : '✕ FAILED (<24px)'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  Contrast Ratio
                </span>
                <span className={`text-sm font-bold font-mono ${contrastRatio >= 4.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {contrastRatio}:1 {contrastRatio >= 7.0 ? '(AAA)' : contrastRatio >= 4.5 ? '(AA)' : '(FAIL)'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#131b2e] border border-[#1E293B] text-xs text-slate-300">
              <strong className="text-white">Fingertip Coverage: </strong>
              <span>
                Standard human fingertip pad is 10mm (~48px). This target covers{' '}
                <strong className={audit.fingerCoveragePercent >= 100 ? 'text-emerald-400' : 'text-amber-400'}>
                  {audit.fingerCoveragePercent}%
                </strong>{' '}
                of the natural contact area.
              </span>
            </div>
          </div>

          {/* Code Exporter Tabs */}
          <div className="rounded-2xl bg-[#0F172A] border border-[#1E293B] overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3 bg-[#131b2e]/60">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
                {(['tailwind', 'swiftui', 'compose', 'css'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                      activeCodeTab === tab
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 cursor-pointer transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="p-4 bg-[#060e20]">
              <pre className="text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                <code>{currentCode}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
