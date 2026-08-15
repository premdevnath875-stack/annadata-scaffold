'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className = '',
  interactive = false,
  selected = false,
  onClick,
  padding = 'md',
}: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const interactiveStyles = interactive
    ? 'cursor-pointer transition-all duration-400 hover:shadow-tech-soft hover:border-teal hover:-translate-y-0.5'
    : '';

  const selectedStyles = selected ? 'border-2 border-teal shadow-tech-soft' : 'border border-transparent';

  return (
    <div
      className={`bg-section-bg rounded-lg ${paddingStyles[padding]} ${interactiveStyles} ${selectedStyles} ${className}`}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

interface CardWhiteProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function CardWhite({ children, className = '', padding = 'md' }: CardWhiteProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white rounded-lg border border-border-subtle ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
