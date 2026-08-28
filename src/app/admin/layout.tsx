/**
 * Admin root layout - serves as a pass-through for both login and protected routes.
 * Authentication checks are handled in the (protected) group layout for protected routes only.
 * This layout ensures /admin/login is publicly accessible without triggering redirects.
 */
export default function AdminLayout(props: {
  children: React.ReactNode;
}) {
  return <>{props.children}</>;
}
