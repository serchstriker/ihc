import React from 'react';
import { RulerConfig } from '../types';

interface RulerOverlayProps {
  width: number;
  height: number;
  unit?: string;
  isCompliant?: boolean;
  config: RulerConfig;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export const RulerOverlay: React.FC<RulerOverlayProps> = ({
  width,
  height,
  unit = 'dp',
  isCompliant,
  config,
  label,
  className = '',
  children,
}) => {
  const borderColor =
    isCompliant === undefined
      ? '#6366F1'
      : isCompliant
      ? '#10B981'
      : '#EF4444';

  const glowShadow =
    isCompliant === undefined
      ? '0 0 12px rgba(99, 102, 241, 0.25)'
      : isCompliant
      ? '0 0 14px rgba(16, 185, 129, 0.25)'
      : '0 0 14px rgba(239, 68, 68, 0.25)';

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Touch Target Physical Halo */}
      {config.showTouchHalo && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg transition-all"
          style={{
            backgroundColor:
              isCompliant === false
                ? 'rgba(239, 68, 68, 0.08)'
                : 'rgba(99, 102, 241, 0.08)',
            boxShadow: glowShadow,
          }}
        />
      )}

      {/* Dashed Spec Bounding Box */}
      {config.showBounds && (
        <div
          className="absolute inset-0 pointer-events-none rounded transition-all"
          style={{
            border: `1.5px dashed ${borderColor}`,
          }}
        >
          {/* Corner tick marks */}
          <div
            className="absolute -top-1 -left-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: borderColor }}
          />
          <div
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: borderColor }}
          />
          <div
            className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: borderColor }}
          />
          <div
            className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: borderColor }}
          />
        </div>
      )}

      {/* Dimension Annotation Ticks */}
      {config.showDimensions && (
        <>
          {/* Top Width Tag */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none z-10">
            <span
              className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded shadow-sm whitespace-nowrap bg-[#0B0F19] border"
              style={{
                borderColor: `${borderColor}60`,
                color: borderColor,
              }}
            >
              {width}
              {unit}
            </span>
          </div>

          {/* Right Height Tag */}
          <div className="absolute -right-11 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <span
              className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded shadow-sm whitespace-nowrap bg-[#0B0F19] border"
              style={{
                borderColor: `${borderColor}60`,
                color: borderColor,
              }}
            >
              {height}
              {unit}
            </span>
          </div>
        </>
      )}

      {/* Main Target Content */}
      {children}
    </div>
  );
};
