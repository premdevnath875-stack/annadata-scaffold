'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError('Invalid login credentials.');
      setLoading(false);
    } else {
      router.push('/admin-hd-x92/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-section-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-tech-soft w-full max-w-md overflow-hidden">
        <div className="bg-charcoal p-6 text-center">
          <Image
            src="/logo/annadata-logo.png"
            alt="Annadata Logo"
            width={120}
            height={40}
            className="mx-auto mb-4"
          />
          <h1 className="text-white font-heading font-semibold text-lg">
            Admin Portal
          </h1>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@ostwal.in"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            
            {error && (
              <p className="text-coral text-sm font-body">{error}</p>
            )}
            
            <Button type="submit" fullWidth loading={loading} className="mt-6">
              {loading ? 'Authenticating...' : 'Secure Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
