// app/admin/layout.tsx
import Link from "next/link";
import { Home, BarChart3, CalendarCheck } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-xl border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h1>

        <nav className="space-y-3">
            <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition font-medium text-gray-700"
          >
            <CalendarCheck size={20} />
            Dashboard
          </Link>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition font-medium text-gray-700"
          >
            <CalendarCheck size={20} />
            Bookings
          </Link>

          <Link
            href="/admin/analytics"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition font-medium text-gray-700"
          >
            <BarChart3 size={20} />
            Analytics
          </Link>

          <Link
            href="/rooms"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition font-medium text-gray-700"
          >
            <Home size={20} />
            Back to Rooms
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
