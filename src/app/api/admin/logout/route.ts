import { NextResponse } from 'next/server';

/**
 * Admin logout endpoint - clears session cookie.
 */
export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

  // Clear the admin session cookie
  response.cookies.delete('admin-session');

  return response;
}
