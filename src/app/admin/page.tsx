"use client";

import { useEffect, useState } from "react";

interface Room {
  id: string;
}

interface Booking {
  id: string;
  userName: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  room: {
    name: string;
    roomNumber: string;
  };
}

export default function AdminDashboardPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  async function fetchData() {
    setLoading(true);

    const roomsRes = await fetch("/api/rooms");
    const roomsData = await roomsRes.json();

    const bookingsRes = await fetch("/api/bookings");
    const bookingsData = await bookingsRes.json();

    setRooms(roomsData);
    setBookings(bookingsData);

    // Calculate revenue & hours
   let revenue = 0;
let hours = 0;

bookingsData.forEach((b: Booking) => {
  if (b.status === "CONFIRMED") {
    revenue += b.totalPrice;

    const start = new Date(b.startTime).getTime();
    const end = new Date(b.endTime).getTime();
    hours += (end - start) / (1000 * 60 * 60);
  }
});


    setTotalRevenue(revenue);
    setTotalHours(hours);

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">

      {/* PAGE HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard Overview
      </h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
          <h2 className="text-gray-600 font-semibold">Total Rooms</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{rooms.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
          <h2 className="text-gray-600 font-semibold">Total Bookings</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">
            {bookings.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
          <h2 className="text-gray-600 font-semibold">Total Revenue</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            ₹{totalRevenue}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
          <h2 className="text-gray-600 font-semibold">Total Hours</h2>
          <p className="text-4xl font-bold text-yellow-500 mt-2">
            {totalHours.toFixed(2)}
          </p>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Room</th>
                <th className="p-3">Start</th>
                <th className="p-3">End</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.slice(0, 5).map((b) => (
                <tr
                  key={b.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{b.userName}</td>

                  <td className="p-3">
                    {b.room.name}
                    <p className="text-xs text-gray-600">
                      #{b.room.roomNumber}
                    </p>
                  </td>

                  <td className="p-3 text-gray-700">
                    {new Date(b.startTime).toLocaleString()}
                  </td>

                  <td className="p-3 text-gray-700">
                    {new Date(b.endTime).toLocaleString()}
                  </td>

                  <td className="p-3 font-semibold text-blue-600">
                    ₹{b.totalPrice}
                  </td>

                  <td className="p-3">
                    {b.status === "CONFIRMED" ? (
                      <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                        Confirmed
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-full">
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-5 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-10" />
    </div>
  );
}
