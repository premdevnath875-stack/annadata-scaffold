import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: 'white' | 'section' | 'gradient' | 'dark' | 'transparent';
  fullWidth?: boolean;
  noPadding?: boolean;
}

/**
 * SectionWrapper — wraps each homepage section in the standard
 * 1280px max-width container with consistent vertical spacing.
 * Use `bg` to switch between white, #F0F4F8, brand gradient,
 * and dark (#1E1E1E) backgrounds.
 */
export function SectionWrapper({
  children,
  className = '',
  id,
  bg = 'white',
  fullWidth = false,
  noPadding = false,
}: SectionProps) {
  const bgStyles = {
    white: 'bg-white',
    section: 'bg-section-bg',
    gradient: 'bg-brand-gradient',
    dark: 'bg-footer-bg',
    transparent: 'bg-transparent',
  };

  const textStyles = {
    white: '',
    section: '',
    gradient: 'text-white',
    dark: 'text-white',
    transparent: '',
  };

  return (
    <section
      id={id}
      className={`${bgStyles[bg]} ${textStyles[bg]} ${noPadding ? '' : 'py-16 md:py-20 lg:py-[120px]'} ${className}`}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
          {children}
        </div>
      )}
    </section>
  );
}

/**
 * SectionLabel — small uppercase tracked label above section headings
 * e.g. "PRODUCT SPECS", "OUR PRESENCE"
 */
export function SectionLabel({
  children,
  className = '',
  color = 'teal',
}: {
  children: React.ReactNode;
  className?: string;
  color?: 'teal' | 'coral' | 'white';
}) {
  const colorStyles = {
    teal: 'text-teal',
    coral: 'text-coral',
    white: 'text-white/80',
  };

  return (
    <span
      className={`text-xs font-bold font-body tracking-[0.1em] uppercase ${colorStyles[color]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * SectionHeading — headline for sections
 */
export function SectionHeading({
  children,
  className = '',
  as: Tag = 'h2',
  size = 'md',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeStyles = {
    sm: 'text-xl md:text-2xl font-semibold leading-[1.3]',
    md: 'text-2xl md:text-[32px] font-semibold leading-[1.2]',
    lg: 'text-3xl md:text-5xl font-bold leading-[1.1] tracking-[-0.02em]',
  };

  return (
    <Tag className={`font-heading text-charcoal ${sizeStyles[size]} ${className}`}>
      {children}
    </Tag>
  );
}
