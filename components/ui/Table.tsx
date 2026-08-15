'use client';

import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: string;
  emptyMessage?: string;
  loading?: boolean;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  emptyMessage = 'No data available',
  loading = false,
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="rounded-lg overflow-hidden border border-border-subtle">
        <div className="animate-pulse">
          <div className="h-12 bg-section-bg" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 border-t border-border-subtle">
              <div className="h-4 bg-surface-container-high rounded m-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-border-subtle p-12 text-center">
        <p className="text-body-text font-body">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border-subtle overflow-x-auto">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="bg-section-bg">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left font-semibold text-charcoal ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={String(item[keyField])}
              className={`border-t border-border-subtle transition-colors ${
                onRowClick
                  ? 'cursor-pointer hover:bg-section-bg/50'
                  : ''
              }`}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-body-text ${col.className || ''}`}
                >
                  {col.render
                    ? col.render(item)
                    : String(item[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
