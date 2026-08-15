'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV_LINKS } from '@/lib/constants';
import { useRealtimeEnquiries } from '@/lib/realtime/useRealtimeEnquiries';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { unreadCount, notifications, dismissNotification, dismissAll } = useRealtimeEnquiries();

  if (pathname === '/admin-hd-x92/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-section-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border-subtle flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-4 border-b border-border-subtle">
          <Link href="/admin-hd-x92/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-bold font-heading text-coral">ANNADATA</span>
            <span className="text-xs bg-coral/10 text-coral px-2 py-0.5 rounded-full font-bold font-body">ADMIN</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4" role="navigation" aria-label="Admin navigation">
          <ul className="space-y-0.5 px-2">
            {ADMIN_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                      isActive
                        ? 'bg-coral/10 text-coral font-semibold'
                        : 'text-body-text hover:bg-section-bg'
                    }`}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.label}</span>
                    {link.label === 'Enquiries' && unreadCount > 0 && (
                      <span className="ml-auto bg-coral text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border-subtle text-xs text-body-text/50 font-body">
          <Link href="/" className="hover:text-teal transition-colors">
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-border-subtle flex items-center justify-between px-6 shrink-0">
          <h1 className="text-sm font-semibold font-heading text-charcoal">
            {ADMIN_NAV_LINKS.find((l) => pathname.startsWith(l.href))?.label || 'Admin'}
          </h1>
          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <div className="relative">
              <button className="relative" aria-label={`Notifications: ${unreadCount} unread`}>
                <svg className="w-5 h-5 text-body-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Toast notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="bg-white rounded-lg shadow-tech-soft border border-border-subtle p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center shrink-0">
                <span className="text-sm">📩</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold font-body text-charcoal">New Enquiry</p>
                <p className="text-xs text-body-text font-body truncate">
                  {n.enquiry.name} — {n.enquiry.business_interest || n.enquiry.crop || 'General'}
                </p>
              </div>
              <button
                onClick={() => dismissNotification(n.id)}
                className="text-body-text/40 hover:text-body-text transition-colors"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
