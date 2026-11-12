import React from 'react';
import { Check, X, AlertTriangle, Ruler } from 'lucide-react';

interface SpecBadgeProps {
  variant: 'do' | 'dont' | 'warning' | 'spec' | 'info';
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const SpecBadge: React.FC<SpecBadgeProps> = ({
  variant,
  children,
  icon = true,
  className = '',
  size = 'md',
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'h-5 px-2 text-[10px] tracking-wider'
      : 'h-6 px-2.5 text-xs';

  let variantClasses = '';
  let IconComponent: React.ReactNode = null;

  switch (variant) {
    case 'do':
      variantClasses =
        'bg-emerald-500/10 border-emerald-500/35 text-emerald-400 font-mono';
      IconComponent = icon ? <Check className="w-3 h-3 stroke-[2.5]" /> : null;
      break;
    case 'dont':
      variantClasses =
        'bg-rose-500/10 border-rose-500/35 text-rose-400 font-mono';
      IconComponent = icon ? <X className="w-3 h-3 stroke-[2.5]" /> : null;
      break;
    case 'warning':
      variantClasses =
        'bg-amber-500/10 border-amber-500/35 text-amber-300 font-mono';
      IconComponent = icon ? <AlertTriangle className="w-3 h-3 stroke-[2.5]" /> : null;
      break;
    case 'spec':
      variantClasses =
        'bg-[#0F172A] border-[#334155] text-slate-300 font-mono shadow-sm';
      IconComponent = icon ? <Ruler className="w-3 h-3 text-indigo-400" /> : null;
      break;
    case 'info':
      variantClasses =
        'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 font-mono';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium select-none whitespace-nowrap transition-colors ${sizeClasses} ${variantClasses} ${className}`}
    >
      {IconComponent}
      <span>{children}</span>
    </span>
  );
};
