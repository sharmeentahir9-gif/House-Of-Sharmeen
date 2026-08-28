import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { Env } from '@/libs/Env';

/**
 * Check if the current request has admin authentication.
 * For use in server components or route handlers.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session');
    return session?.value === 'authenticated';
  } catch {
    return false;
  }
}

/**
 * Check if a request has admin authentication.
 * For use in API route handlers.
 */
export function isRequestAdminAuthenticated(request: NextRequest): boolean {
  try {
    const session = request.cookies.get('admin-session');
    return session?.value === 'authenticated';
  } catch {
    return false;
  }
}

/**
 * Verify that ADMIN_PASSWORD is configured.
 * Fails securely if not configured.
 */
export function isAdminConfigured(): boolean {
  return !!Env.ADMIN_PASSWORD;
}
