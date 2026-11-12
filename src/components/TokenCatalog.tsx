import React, { useState } from 'react';
import { SpecBadge } from './SpecBadge';
import { calculateContrastRatio } from '../utils/ergonomics';
import { 
  Palette, 
  Type, 
  Layers, 
  Box, 
  Copy, 
  Check, 
  Download, 
  Code2 
} from 'lucide-react';

export const TokenCatalog: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const colors = [
    { name: 'Canvas Base', hex: '#0B0F19', role: 'Root background, deepest canvas layer' },
    { name: 'Surface 1', hex: '#0F172A', role: 'Slate base container for sections & panels' },
    { name: 'Surface 2', hex: '#1E293B', role: 'Elevated cards, modules & sandboxes' },
    { name: 'Surface 3', hex: '#334155', role: 'Highest local elevation, overlays & dialogs' },
    { name: 'Primary (Electric Blurple)', hex: '#4F46E5', role: 'Primary actions, active states & nav nodes' },
    { name: 'Secondary ("Do" Pass)', hex: '#10B981', role: 'Compliant patterns, validated checks, WCAG AAA' },
    { name: 'Tertiary ("Don\'t" Fail)', hex: '#EF4444', role: 'Anti-patterns, accessibility violations, cramped targets' },
    { name: 'Warning Accent', hex: '#F59E0B', role: 'Cautionary thresholds, platform-specific quirks' },
    { name: 'Text Primary', hex: '#F8FAFC', role: '100% contrast readability body copy' },
    { name: 'Text Secondary', hex: '#94A3B8', role: 'Metadata, technical captions & spec labels' },
    { name: 'Text Muted', hex: '#64748B', role: 'Disabled nodes & inactive states' },
    { name: 'Spec Outline', hex: '#6366F1', role: 'Ruler guides & dashed bounding annotations' },
  ];

  const typography = [
    { name: 'Headline XL', font: 'Plus Jakarta Sans', size: '40px', weight: '700', lh: '48px', ls: '-0.02em', sample: 'Ergonomic Excellence' },
    { name: 'Headline LG', font: 'Plus Jakarta Sans', size: '32px', weight: '700', lh: '40px', ls: '-0.015em', sample: 'Tactile Engineering' },
    { name: 'Headline MD', font: 'Plus Jakarta Sans', size: '20px', weight: '600', lh: '26px', ls: '-0.01em', sample: 'Touch Target Geometry' },
    { name: 'Headline SM', font: 'Plus Jakarta Sans', size: '16px', weight: '600', lh: '22px', ls: '-0.005em', sample: 'Thumb Sweep Safe Zones' },
    { name: 'Body Large', font: 'Plus Jakarta Sans', size: '16px', weight: '400', lh: '24px', ls: '0', sample: 'Standard touch zones must maintain a min-size box of 48×48px.' },
    { name: 'Body Medium', font: 'Plus Jakarta Sans', size: '14px', weight: '400', lh: '20px', ls: '0', sample: 'Visual iconography inside can be smaller while container expands.' },
    { name: 'Code Spec LG', font: 'JetBrains Mono', size: '14px', weight: '500', lh: '20px', ls: '0.02em', sample: 'min-h: 48px; min-w: 48px;' },
    { name: 'Code Spec MD', font: 'JetBrains Mono', size: '12px', weight: '500', lh: '16px', ls: '0.04em', sample: 'WCAG_2_2_AAA_PASS = 7.1:1' },
    { name: 'Code Spec SM', font: 'JetBrains Mono', size: '10px', weight: '500', lh: '14px', ls: '0.04em', sample: '48dp × 48dp (BOUNDING_BOX)' },
  ];

  const handleCopy = (token: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const downloadTokensJSON = () => {
    const data = {
      name: 'Technical Craft Dark',
      version: '2.2.0',
      colors: colors.reduce((acc, c) => ({ ...acc, [c.name]: c.hex }), {}),
      touchTargetRequirements: {
        android: { minSize: 48, unit: 'dp', standard: 'Material 3' },
        ios: { minSize: 44, unit: 'pt', standard: 'Apple HIG' },
        web: { minSize: 48, unit: 'px', standard: 'WCAG 2.2 AAA' },
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'technical-craft-tokens.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Design Tokens &amp; Architectural Specifications
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Machine-precise color hierarchy, typography scale, and ergonomic layout tokens.
          </p>
        </div>

        <button
          type="button"
          onClick={downloadTokensJSON}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-600/25 transition-all self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Tokens (JSON)</span>
        </button>
      </div>

      {/* SECTION 1: COLOR PALETTE */}
      <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4 text-indigo-400" />
            <span>Semantic Dark Palette &amp; Contrast Validation</span>
          </h3>
          <SpecBadge variant="spec">7:1 (AAA) Contrast Discipline</SpecBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colors.map((c) => {
            const contrast = calculateContrastRatio(c.hex, '#0B0F19');
            return (
              <div
                key={c.name}
                className="p-3.5 rounded-xl bg-[#0B0F19] border border-[#1E293B] flex items-start gap-3 relative group hover:border-[#334155] transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg shrink-0 border border-white/10 shadow-sm"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{c.name}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(c.name, c.hex)}
                      className="text-slate-400 hover:text-white p-1 cursor-pointer"
                      title="Copy hex code"
                    >
                      {copiedToken === c.name ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-400 block mt-0.5">
                    {c.hex}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug line-clamp-2">
                    {c.role}
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-slate-500">
                    Contrast vs Root: <span className="text-slate-300">{contrast}:1</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: TYPOGRAPHY ENGINE */}
      <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <Type className="w-4 h-4 text-indigo-400" />
            <span>Dual Typographic Engine: Plus Jakarta Sans &amp; JetBrains Mono</span>
          </h3>
          <SpecBadge variant="spec">Proportional + Monospace</SpecBadge>
        </div>

        <div className="divide-y divide-[#1E293B]">
          {typography.map((t) => (
            <div key={t.name} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="md:w-1/3">
                <span className="text-xs font-mono font-bold text-indigo-400">{t.name}</span>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {t.font} • {t.size} / {t.lh} • wt {t.weight}
                </div>
              </div>
              <div className="md:w-2/3">
                <p
                  style={{
                    fontFamily: t.font.includes('Mono') ? 'JetBrains Mono' : 'Plus Jakarta Sans',
                    fontSize: t.size,
                    fontWeight: t.weight,
                    lineHeight: t.lh,
                    letterSpacing: t.ls,
                  }}
                  className="text-white truncate"
                >
                  {t.sample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: ELEVATION & DEPTH ARCHITECTURE */}
      <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Tonal Layering &amp; Edge Illumination Depth</span>
          </h3>
          <SpecBadge variant="spec">Zero Skeuomorphism</SpecBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#1E293B]">
            <span className="text-xs font-mono text-indigo-400 font-bold block mb-1">
              Layer 0: Canvas Base
            </span>
            <span className="text-[11px] font-mono text-slate-400 block">#0B0F19</span>
            <p className="text-xs text-slate-300 mt-2">
              Deepest viewport root. No shadow. Provides maximum dynamic range.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B]">
            <span className="text-xs font-mono text-indigo-400 font-bold block mb-1">
              Layer 1: Module Container
            </span>
            <span className="text-[11px] font-mono text-slate-400 block">#0F172A</span>
            <p className="text-xs text-slate-300 mt-2">
              Slate base container with 1px border of #1E293B for structured card groups.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1E293B] border border-[#334155] shadow-lg shadow-black/40">
            <span className="text-xs font-mono text-indigo-400 font-bold block mb-1">
              Layer 2: Interactive Cards
            </span>
            <span className="text-[11px] font-mono text-slate-400 block">#1E293B</span>
            <p className="text-xs text-slate-300 mt-2">
              Elevated interactive surfaces with ambient shadow: 0 4px 16px -2px rgba(0,0,0,0.45).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#334155] border border-slate-600 shadow-xl shadow-black/60">
            <span className="text-xs font-mono text-indigo-400 font-bold block mb-1">
              Layer 3: Overlays &amp; Modals
            </span>
            <span className="text-[11px] font-mono text-slate-400 block">#334155</span>
            <p className="text-xs text-slate-300 mt-2">
              Highest elevation for floating sheets, active dialogs &amp; inspector panels.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
