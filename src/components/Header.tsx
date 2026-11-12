import React from 'react';
import { Platform } from '../utils/ergonomics';
import { ActiveTab, RulerConfig } from '../types';
import { 
  Layers, 
  Smartphone, 
  Sliders, 
  Target, 
  BookOpen, 
  Ruler, 
  Eye, 
  Sparkles,
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface HeaderProps {
  platform: Platform;
  onPlatformChange: (p: Platform) => void;
  activeTab: ActiveTab;
  onTabChange: (t: ActiveTab) => void;
  rulerConfig: RulerConfig;
  onToggleRuler: <K extends keyof RulerConfig>(key: K) => void;
}

export const Header: React.FC<HeaderProps> = ({
  platform,
  onPlatformChange,
  activeTab,
  onTabChange,
  rulerConfig,
  onToggleRuler,
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'comparison', label: 'Do vs Don\'t', icon: <Layers className="w-4 h-4" /> },
    { id: 'simulator', label: 'Thumb Ergonomics', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'builder', label: 'Audit Lab & Exporter', icon: <Sliders className="w-4 h-4" /> },
    { id: 'benchmark', label: 'Tap Precision Test', icon: <Target className="w-4 h-4" /> },
    { id: 'tokens', label: 'Design Tokens', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E293B] bg-[#0B0F19]/90 backdrop-blur-md">
      {/* Top Bar: Brand, Platform Switcher & Inspector Quick Toggles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
              <Cpu className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base font-sans">
                  TECHNICAL CRAFT
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  DARK v2.2
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                <span>Mobile Ergonomics</span>
                <span className="text-slate-600">•</span>
                <span>Touch Target Audits</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-medium">WCAG 2.2 AAA</span>
              </p>
            </div>
          </div>

          {/* Controls: Platform Selector & Spec Rulers */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Segmented Platform Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <button
                type="button"
                onClick={() => onPlatformChange('android')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  platform === 'android'
                    ? 'bg-[#1E293B] text-white shadow-sm border border-[#334155]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-pressed={platform === 'android'}
              >
                Android <span className="text-emerald-400 font-semibold ml-1">48dp</span>
              </button>
              <button
                type="button"
                onClick={() => onPlatformChange('ios')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  platform === 'ios'
                    ? 'bg-[#1E293B] text-white shadow-sm border border-[#334155]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-pressed={platform === 'ios'}
              >
                iOS <span className="text-indigo-400 font-semibold ml-1">44pt</span>
              </button>
              <button
                type="button"
                onClick={() => onPlatformChange('web')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  platform === 'web'
                    ? 'bg-[#1E293B] text-white shadow-sm border border-[#334155]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-pressed={platform === 'web'}
              >
                Web <span className="text-sky-400 font-semibold ml-1">48px</span>
              </button>
            </div>

            {/* Quick Spec Overlay Toggles */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <button
                type="button"
                onClick={() => onToggleRuler('showBounds')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  rulerConfig.showBounds
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
                title="Toggle dashed touch target bounds"
                aria-pressed={rulerConfig.showBounds}
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Bounds</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleRuler('showDimensions')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  rulerConfig.showDimensions
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
                title="Toggle dimension ticks"
                aria-pressed={rulerConfig.showDimensions}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Dims</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleRuler('showTouchHalo')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  rulerConfig.showTouchHalo
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
                title="Toggle physical fingertip touch halo"
                aria-pressed={rulerConfig.showTouchHalo}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Halo</span>
              </button>
            </div>

          </div>
        </div>

        {/* Tab Navigation Strip */}
        <nav className="flex items-center gap-1.5 mt-3 sm:mt-4 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1E293B] text-white shadow-sm border border-[#334155]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0F172A]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>
                  {tab.icon}
                </span>
                <span className="whitespace-nowrap">{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 ml-0.5"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
