import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-session";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-surface">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <span className="font-semibold text-foreground">Admin</span>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            View site
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
