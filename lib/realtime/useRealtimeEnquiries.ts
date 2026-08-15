'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Enquiry } from '@/lib/supabase/types';

interface Notification {
  id: string;
  enquiry: Enquiry;
  timestamp: Date;
  dismissed: boolean;
}

export function useRealtimeEnquiries() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestEnquiries, setLatestEnquiries] = useState<Enquiry[]>([]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, dismissed: true } : n))
    );
  }, []);

  const dismissAll = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, dismissed: true })));
  }, []);

  useEffect(() => {
    const supabase = createClient();

    // Fetch initial unread count
    const fetchUnread = async () => {
      const { count } = await supabase
        .from('enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      setUnreadCount(count ?? 0);
    };

    // Fetch latest enquiries
    const fetchLatest = async () => {
      const { data } = await supabase
        .from('enquiries')
        .select('*')
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setLatestEnquiries(data as Enquiry[]);
    };

    fetchUnread();
    fetchLatest();

    // Subscribe to real-time inserts
    const channel = supabase
      .channel('enquiries-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'enquiries',
        },
        (payload) => {
          const newEnquiry = payload.new as Enquiry;

          // Add notification
          setNotifications((prev) => [
            {
              id: newEnquiry.id,
              enquiry: newEnquiry,
              timestamp: new Date(),
              dismissed: false,
            },
            ...prev,
          ]);

          // Update unread count
          setUnreadCount((prev) => prev + 1);

          // Update latest enquiries list
          setLatestEnquiries((prev) => [newEnquiry, ...prev].slice(0, 5));

          // Auto-dismiss notification after 5 seconds
          setTimeout(() => {
            setNotifications((prev) =>
              prev.map((n) =>
                n.id === newEnquiry.id ? { ...n, dismissed: true } : n
              )
            );
          }, 5000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const activeNotifications = notifications.filter((n) => !n.dismissed);

  return {
    notifications: activeNotifications,
    unreadCount,
    latestEnquiries,
    dismissNotification,
    dismissAll,
  };
}
