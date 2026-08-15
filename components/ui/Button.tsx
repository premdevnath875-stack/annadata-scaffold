'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white-outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-body font-semibold rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-coral text-white hover:bg-[#c94444] focus:ring-coral shadow-tech-soft',
    secondary:
      'bg-teal text-white hover:bg-[#2a7390] focus:ring-teal shadow-tech-soft',
    outline:
      'border-2 border-teal text-teal bg-transparent hover:bg-teal hover:text-white focus:ring-teal',
    ghost:
      'text-teal bg-transparent hover:bg-section-bg focus:ring-teal',
    'white-outline':
      'border-2 border-white text-white bg-transparent hover:bg-white/10 focus:ring-white',
  };

  const sizeStyles = {
    sm: 'h-8 px-4 text-sm gap-1.5',
    md: 'h-10 px-6 text-sm gap-2',
    lg: 'h-12 px-8 text-base gap-2',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
