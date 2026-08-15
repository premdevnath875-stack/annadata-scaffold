'use client';

import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'teal' | 'coral' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export function Chip({
  children,
  variant = 'teal',
  size = 'md',
  removable = false,
  onRemove,
  className = '',
}: ChipProps) {
  const variantStyles = {
    teal: 'bg-teal/10 text-teal',
    coral: 'bg-coral/10 text-coral',
    success: 'bg-green-500/10 text-green-700',
    warning: 'bg-amber-500/10 text-amber-700',
    neutral: 'bg-surface-container-highest text-body-text',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold font-body ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="ml-0.5 hover:opacity-70 transition-opacity"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Status Badge — used in admin for product/enquiry status
   ═══════════════════════════════════════════════════════════════ */

const STATUS_MAP: Record<string, { variant: ChipProps['variant']; label: string }> = {
  published: { variant: 'success', label: 'Published' },
  draft: { variant: 'warning', label: 'Draft' },
  archived: { variant: 'neutral', label: 'Archived' },
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'neutral', label: 'Inactive' },
  new: { variant: 'teal', label: 'New' },
  in_progress: { variant: 'warning', label: 'In Progress' },
  resolved: { variant: 'success', label: 'Resolved' },
  closed: { variant: 'neutral', label: 'Closed' },
};

export function StatusBadge({ status }: { status: string }) {
  const config = STATUS_MAP[status] || { variant: 'neutral' as const, label: status };
  return <Chip variant={config.variant}>{config.label}</Chip>;
}
