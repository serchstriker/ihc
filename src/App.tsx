/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Platform, PLATFORM_SPECS } from './utils/ergonomics';
import { ActiveTab, RulerConfig } from './types';
import { Header } from './components/Header';
import { DoDontGallery } from './components/DoDontGallery';
import { MobileSimulator } from './components/MobileSimulator';
import { TargetBuilder } from './components/TargetBuilder';
import { AccuracyBenchmark } from './components/AccuracyBenchmark';
import { TokenCatalog } from './components/TokenCatalog';
import { ShieldCheck, Ruler, CheckCircle2, Smartphone, Sparkles, Terminal } from 'lucide-react';

export default function App() {
  const [platform, setPlatform] = useState<Platform>('android');
  const [activeTab, setActiveTab] = useState<ActiveTab>('comparison');
  const [rulerConfig, setRulerConfig] = useState<RulerConfig>({
    showBounds: true,
    showDimensions: true,
    showPadding: true,
    showTouchHalo: true,
  });

  // Handle URL query parameters for fast verification testing (?tab=simulator, etc.)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as ActiveTab | null;
    const platformParam = params.get('platform') as Platform | null;

    if (tabParam && ['comparison', 'simulator', 'builder', 'benchmark', 'tokens'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
    if (platformParam && ['android', 'ios', 'web'].includes(platformParam)) {
      setPlatform(platformParam);
    }
  }, []);

  const handleToggleRuler = <K extends keyof RulerConfig>(key: K) => {
    setRulerConfig((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentSpec = PLATFORM_SPECS[platform];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col selection:bg-indigo-600/30 selection:text-indigo-200">
      
      {/* Top Application Header */}
      <Header
        platform={platform}
        onPlatformChange={setPlatform}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        rulerConfig={rulerConfig}
        onToggleRuler={handleToggleRuler}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Active Tab View Rendering */}
        {activeTab === 'comparison' && (
          <DoDontGallery platform={platform} rulerConfig={rulerConfig} />
        )}

        {activeTab === 'simulator' && (
          <MobileSimulator platform={platform} rulerConfig={rulerConfig} />
        )}

        {activeTab === 'builder' && (
          <TargetBuilder platform={platform} rulerConfig={rulerConfig} />
        )}

        {activeTab === 'benchmark' && (
          <AccuracyBenchmark platform={platform} />
        )}

        {activeTab === 'tokens' && (
          <TokenCatalog />
        )}

      </main>

      {/* Footer Spec Status Strip */}
      <footer className="border-t border-[#1E293B] bg-[#060e20] py-6 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">TECHNICAL CRAFT DARK SYSTEM</span>
            <span className="text-slate-600">•</span>
            <span>Active Spec: <strong className="text-indigo-400">{currentSpec.standard} ({currentSpec.minTarget}{currentSpec.unit})</strong></span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>WCAG 2.2 AAA (SC 2.5.5)</span>
            <span className="text-slate-700">|</span>
            <span>Touch Target Geometry 48×48px</span>
            <span className="text-slate-700">|</span>
            <span>Thumb Reach Safe Zones</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
