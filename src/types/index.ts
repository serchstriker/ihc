import { Platform } from '../utils/ergonomics';

export type ActiveTab = 'comparison' | 'simulator' | 'builder' | 'benchmark' | 'tokens';

export interface RulerConfig {
  showBounds: boolean;
  showDimensions: boolean;
  showPadding: boolean;
  showTouchHalo: boolean;
}

export interface DoDontItem {
  id: string;
  title: string;
  category: 'buttons' | 'icons' | 'navigation' | 'forms' | 'lists' | 'dialogs';
  description: string;
  wcagRule: string;
  do: {
    title: string;
    targetWidth: number;
    targetHeight: number;
    visualWidth: number;
    visualHeight: number;
    spacing: number;
    codeSnippet: string;
    explanation: string;
  };
  dont: {
    title: string;
    targetWidth: number;
    targetHeight: number;
    visualWidth: number;
    visualHeight: number;
    spacing: number;
    codeSnippet: string;
    explanation: string;
  };
}
