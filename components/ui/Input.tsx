'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-charcoal font-body"
        >
          {label}
          {props.required && <span className="text-coral ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`h-10 px-4 bg-white border rounded text-body-text font-body text-sm
          transition-colors duration-200 placeholder:text-body-text/40
          focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/20
          disabled:bg-surface-container disabled:cursor-not-allowed
          ${error ? 'border-coral' : 'border-border-subtle'}
          ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-coral font-body">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-xs text-body-text/60 font-body">{helperText}</span>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className = '',
  id,
  ...props
}: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-charcoal font-body"
        >
          {label}
          {props.required && <span className="text-coral ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        className={`px-4 py-3 bg-white border rounded text-body-text font-body text-sm
          transition-colors duration-200 placeholder:text-body-text/40 resize-y min-h-[100px]
          focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/20
          ${error ? 'border-coral' : 'border-border-subtle'}
          ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-coral font-body">{error}</span>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder = 'Select...',
  className = '',
  id,
  ...props
}: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-charcoal font-body"
        >
          {label}
          {props.required && <span className="text-coral ml-0.5">*</span>}
        </label>
      )}
      <select
        id={inputId}
        className={`h-10 px-4 bg-white border rounded text-body-text font-body text-sm
          transition-colors duration-200 appearance-none
          focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/20
          ${error ? 'border-coral' : 'border-border-subtle'}
          ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234A4A4A' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: '36px',
        }}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-coral font-body">{error}</span>
      )}
    </div>
  );
}
