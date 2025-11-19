export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 px-6 py-20 flex flex-col items-center">

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Welcome to <span className="text-blue-600">WorkspaceBook</span>
      </h1>

      <p className="text-gray-600 mt-3 text-center max-w-xl">
        A modern workspace booking & management system built with Next.js 15, Prisma ORM, and Tailwind CSS.
      </p>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-5xl w-full">

        {/* Card 1 */}
        <a
          href="/rooms"
          className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition border border-gray-100 hover:-translate-y-1"
        >
          <h2 className="text-2xl font-semibold text-gray-800">View Rooms</h2>
          <p className="text-gray-600 mt-3">
            Browse all available workspaces and choose the perfect one for booking.
          </p>
        </a>

        {/* Card 2 */}
        <a
          href="/admin/bookings"
          className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition border border-gray-100 hover:-translate-y-1"
        >
          <h2 className="text-2xl font-semibold text-gray-800">Manage Bookings</h2>
          <p className="text-gray-600 mt-3">
            View, track and manage all workspace bookings in one place.
          </p>
        </a>

        {/* Card 3 */}
        <a
          href="/admin/analytics"
          className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition border border-gray-100 hover:-translate-y-1"
        >
          <h2 className="text-2xl font-semibold text-gray-800">Analytics</h2>
          <p className="text-gray-600 mt-3">
            Analyze workspace usage, revenue and performance insights.
          </p>
        </a>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-20">
        © {new Date().getFullYear()} WorkspaceBook • Built with Sameer
      </p>
    </div>
  );
}
