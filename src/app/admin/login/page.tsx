'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Login successful, redirect to orders page
      router.push('/admin/orders');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#efe5d3] to-[#f5f1e8] px-5">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-[#caa454]/35 bg-white p-8 shadow-lg">
          <h1 className="font-serif text-3xl font-semibold text-[#15120e]">Admin Login</h1>
          <p className="mt-2 text-sm text-black/60">Enter your admin password to access the orders dashboard.</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-bold text-[#15120e]">Admin Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                className="mt-2 w-full border border-black/15 bg-white px-4 py-3.5 font-normal outline-none focus:border-[#b58b33] disabled:opacity-60"
                placeholder="Enter password"
              />
            </label>

            {error && (
              <p role="alert" className="border border-red-900/20 bg-red-50 px-4 py-3 text-sm text-red-900">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#15120e] px-6 py-4 text-sm font-black tracking-wide text-[#efd37f] transition hover:bg-[#2d271c] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <p className="mt-6 text-xs text-black/50 text-center">
            This is a secured admin panel. Only authorized personnel should access this page.
          </p>
        </div>
      </div>
    </div>
  );
}
