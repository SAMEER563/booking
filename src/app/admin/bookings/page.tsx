// app/admin/bookings/page.tsx
"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";


interface Room {
  id: string;
  name: string;
  roomNumber: string;
}

interface Booking {
  id: string;
  userName: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: "CONFIRMED" | "CANCELLED";
  room: Room;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<string>("");
  const ZONE = "Asia/Kolkata";

  async function fetchBookings() {
    const res = await fetch("/api/bookings", { cache: "no-store" });
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  }

  async function cancelBooking(id: string) {
    setAction(id);

    const res = await fetch(`/api/bookings/${id}/cancel`, {
      method: "POST",
    });

    const data = await res.json();

    if (res.ok) {
      alert("Booking cancelled!");
      fetchBookings();
    } else {
      alert(`Error: ${data.error}`);
    }

    setAction("");
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Admin – Bookings List
        </h1>

        {/* TABLE WRAPPER */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">User</th>
                <th className="p-3">Room</th>
                <th className="p-3">Start</th>
                <th className="p-3">End</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{b.userName}</td>

                  <td className="p-3">
                    <p className="font-medium">{b.room.name}</p>
                    <p className="text-sm text-gray-600">
                      #{b.room.roomNumber}
                    </p>
                  </td>


                  <td className="p-3 text-gray-700">
                    {DateTime.fromISO(b.startTime, { zone: "utc" })
                      .setZone(ZONE)
                      .toFormat("dd MMM yyyy, hh:mm a")}
                  </td>

                  <td className="p-3 text-gray-700">
                    {DateTime.fromISO(b.endTime, { zone: "utc" })
                      .setZone(ZONE)
                      .toFormat("dd MMM yyyy, hh:mm a")}
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

                  <td className="p-3 text-center">
                    {b.status === "CONFIRMED" ? (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        disabled={action === b.id}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md shadow-sm transition disabled:bg-red-300"
                      >
                        {action === b.id ? "Cancelling..." : "Cancel"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-300 text-gray-600 text-sm px-3 py-1 rounded-md"
                      >
                        Cancelled
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
