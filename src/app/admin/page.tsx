import { redirect } from 'next/navigation';
import { isAdminAuthenticated, isAdminConfigured } from '@/utils/AdminAuth';

/**
 * Admin root page - redirects to login or orders based on authentication.
 */
export default async function AdminPage() {
  // Fail securely if admin password is not configured
  if (!isAdminConfigured()) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h1 className="font-serif text-4xl font-semibold">Admin Access Not Available</h1>
        <p className="mt-4 text-black/60">The admin panel has not been configured. Please set the ADMIN_PASSWORD environment variable.</p>
      </div>
    );
  }

  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  redirect('/admin/orders');
}
