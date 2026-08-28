import { NextRequest, NextResponse } from 'next/server';
import { Env } from '@/libs/Env';
import { logger } from '@/libs/Logger';

/**
 * Admin login endpoint - validates password and sets session cookie.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    // Check if ADMIN_PASSWORD is configured
    if (!Env.ADMIN_PASSWORD) {
      logger.error('ADMIN_PASSWORD environment variable is not configured');
      return NextResponse.json({ error: 'Admin access is not configured' }, { status: 500 });
    }

    // Validate password
    if (password !== Env.ADMIN_PASSWORD) {
      logger.warn('Invalid admin password attempt');
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Create response with secure cookie
    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    // Set secure, httpOnly cookie for session (expires in 24 hours)
    response.cookies.set('admin-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    logger.error(`Error in admin login: ${error instanceof Error ? error.message : String(error)}`);
    return NextResponse.json({ error: 'Failed to process login' }, { status: 500 });
  }
}
