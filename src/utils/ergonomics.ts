/**
 * Pure ergonomic, accessibility (WCAG 2.2), and touch target math utilities.
 */

export type Platform = 'android' | 'ios' | 'web';

export interface PlatformSpec {
  id: Platform;
  name: string;
  minTarget: number;
  unit: string;
  standard: string;
  wcagReference: string;
  recommendedSpacing: number;
}

export const PLATFORM_SPECS: Record<Platform, PlatformSpec> = {
  android: {
    id: 'android',
    name: 'Android Material 3',
    minTarget: 48,
    unit: 'dp',
    standard: 'Material Design 3 Guidelines',
    wcagReference: 'WCAG 2.2 Target Size (Enhanced) 2.5.5',
    recommendedSpacing: 8,
  },
  ios: {
    id: 'ios',
    name: 'Apple iOS HIG',
    minTarget: 44,
    unit: 'pt',
    standard: 'Human Interface Guidelines',
    wcagReference: 'WCAG 2.2 Target Size (Minimum) 2.5.8',
    recommendedSpacing: 8,
  },
  web: {
    id: 'web',
    name: 'Modern Web / WCAG',
    minTarget: 48,
    unit: 'px',
    standard: 'W3C WCAG 2.2 Level AAA (48px) & AA (24px)',
    wcagReference: 'WCAG 2.2 SC 2.5.5 / 2.5.8',
    recommendedSpacing: 8,
  },
};

export interface TargetAuditResult {
  width: number;
  height: number;
  platform: Platform;
  isCompliant: boolean;
  wcagLevel: 'AAA' | 'AA' | 'FAIL';
  deficitWidth: number;
  deficitHeight: number;
  areaSquareUnits: number;
  fingerCoveragePercent: number; // Against average 48px fingertip
  verdict: 'DO' | 'DON\'T' | 'WARNING';
  summary: string;
}

export function evaluateTouchTarget(
  width: number,
  height: number,
  platform: Platform = 'android'
): TargetAuditResult {
  const spec = PLATFORM_SPECS[platform];
  const minRequired = spec.minTarget;
  const isCompliant = width >= minRequired && height >= minRequired;

  const minDim = Math.min(width, height);
  let wcagLevel: 'AAA' | 'AA' | 'FAIL' = 'FAIL';
  if (minDim >= 48) {
    wcagLevel = 'AAA';
  } else if (minDim >= 24) {
    wcagLevel = 'AA';
  } else {
    wcagLevel = 'FAIL';
  }

  const deficitWidth = Math.max(0, minRequired - width);
  const deficitHeight = Math.max(0, minRequired - height);
  const areaSquareUnits = width * height;

  // Average human fingertip is ~48px (10mm).
  // Calculate relative area coverage vs standard 48x48 box.
  const targetStandardArea = 48 * 48;
  const fingerCoveragePercent = Math.min(100, Math.round((areaSquareUnits / targetStandardArea) * 100));

  let verdict: 'DO' | 'DON\'T' | 'WARNING' = 'DON\'T';
  let summary = '';

  if (isCompliant) {
    verdict = 'DO';
    summary = `Compliant: Exceeds ${spec.minTarget}${spec.unit} threshold. Optimal thumb acquisition.`;
  } else if (minDim >= 24) {
    verdict = 'WARNING';
    summary = `Caution: Meets minimum WCAG AA (24px) but fails ${spec.name} ${spec.minTarget}${spec.unit} standard. High risk of thumb misclick.`;
  } else {
    verdict = 'DON\'T';
    summary = `Anti-Pattern: Severe accessibility violation (<24px). Fails WCAG AA and AAA guidelines.`;
  }

  return {
    width,
    height,
    platform,
    isCompliant,
    wcagLevel,
    deficitWidth,
    deficitHeight,
    areaSquareUnits,
    fingerCoveragePercent,
    verdict,
    summary,
  };
}

/**
 * Calculates WCAG 2.1/2.2 relative luminance and contrast ratio.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    return {
      r: parseInt(cleanHex[0] + cleanHex[0], 16),
      g: parseInt(cleanHex[1] + cleanHex[1], 16),
      b: parseInt(cleanHex[2] + cleanHex[2], 16),
    };
  }
  if (cleanHex.length === 6) {
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16),
    };
  }
  return null;
}

export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export function calculateContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1.0;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Math.round(ratio * 100) / 100;
}

export interface ThumbZoneErgonomics {
  zone: 'natural' | 'stretch' | 'hard';
  comfortScore: number; // 0 - 100
  title: string;
  description: string;
  recommendedActions: string[];
}

/**
 * Screen height percentage from 0 (top) to 1.0 (bottom)
 */
export function evaluateThumbReach(
  yPercentage: number,
  hand: 'right' | 'left' | 'both' = 'right'
): ThumbZoneErgonomics {
  // Safe ergonomic zone is in the lower 60% of the screen.
  // Top 30% is hard-to-reach.
  // 30% - 60% is stretch zone.
  // 60% - 100% (bottom) is natural thumb sweep zone.
  if (yPercentage >= 0.55) {
    return {
      zone: 'natural',
      comfortScore: 98,
      title: 'Natural Thumb Sweep Zone',
      description: 'Optimal for primary CTAs, navigation bars, bottom sheets, and frequent actions.',
      recommendedActions: ['Primary Buttons', 'Bottom Tabs', 'Floating Actions', 'Key Input Fields'],
    };
  } else if (yPercentage >= 0.32) {
    return {
      zone: 'stretch',
      comfortScore: 70,
      title: 'Moderate Stretch Zone',
      description: 'Accessible with minor thumb extension. Well-suited for secondary controls.',
      recommendedActions: ['List Items', 'Filter Chips', 'Segmented Toggles', 'Content Cards'],
    };
  } else {
    return {
      zone: 'hard',
      comfortScore: 28,
      title: 'Hard-to-Reach Zone',
      description: 'Requires uncomfortable thumb hyper-extension or two-handed grip shift.',
      recommendedActions: ['Status / Read-only Specs', 'App Bar Titles', 'Infrequent Settings', 'Header Badges'],
    };
  }
}

/**
 * Simulates tap accuracy score and misclick probability for a given target size.
 */
export function simulateTapPrecision(targetSizePx: number): {
  hitRatePercent: number;
  missRatePercent: number;
  avgAcquisitionTimeMs: number;
  fittsDifficultyIndex: number;
} {
  // Using Fitts's Law approximation with average fingertip diameter = 48px
  const fingerTipSize = 48;
  const ratio = Math.min(1.5, targetSizePx / fingerTipSize);
  
  if (targetSizePx >= 48) {
    return {
      hitRatePercent: 99.4,
      missRatePercent: 0.6,
      avgAcquisitionTimeMs: 240,
      fittsDifficultyIndex: 1.8,
    };
  } else if (targetSizePx >= 36) {
    return {
      hitRatePercent: 91.0,
      missRatePercent: 9.0,
      avgAcquisitionTimeMs: 380,
      fittsDifficultyIndex: 2.9,
    };
  } else if (targetSizePx >= 24) {
    return {
      hitRatePercent: 74.2,
      missRatePercent: 25.8,
      avgAcquisitionTimeMs: 560,
      fittsDifficultyIndex: 4.1,
    };
  } else {
    return {
      hitRatePercent: 48.5,
      missRatePercent: 51.5,
      avgAcquisitionTimeMs: 820,
      fittsDifficultyIndex: 5.6,
    };
  }
}
