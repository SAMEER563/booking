// app/book/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Room {
  id: string;
  roomNumber: string;
  name: string;
  baseHourlyRate: number;
  capacity: number;
}

export default function BookingPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    async function fetchRoom() {
      const res = await fetch(`/api/rooms`);
      const rooms: Room[] = await res.json();
      const found = rooms.find((r) => r.id === roomId);
      setRoom(found || null);
      setLoading(false);
    }
    fetchRoom();
  }, [roomId]);

async function handleBooking() {
  setStatusMessage("Processing...");

  // FIX: Convert local datetime to UTC ISO
  const startIso = startTime ? new Date(startTime).toISOString() : null;
  const endIso = endTime ? new Date(endTime).toISOString() : null;

  if (!startIso || !endIso || !userName) {
    setStatusMessage("❌ Please fill all fields");
    return;
  }

  const res = await fetch(`/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      roomId,
      userName,
      startTime: startIso,
      endTime: endIso,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setStatusMessage(`❌ ${data.error}`);
  } else {
    setStatusMessage(`✅ Booking successful! ID: ${data.bookingId}`);
  }
}


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Loading room details...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Room not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-12 px-4">

       {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition"
        >
          <ArrowLeft size={20} />
          Back
        </Link>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
         
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6">
          <h1 className="text-3xl font-semibold">Book {room.name}</h1>
          <p className="text-gray-100 mt-1">
            Fill the details below to complete the booking
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

          {/* LEFT SIDE — ROOM DETAILS */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Room Details</h2>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-700">
                <span className="font-medium">Room Number:</span> {room.roomNumber}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Capacity:</span> {room.capacity} people
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Base Rate:</span>{" "}
                ₹{room.baseHourlyRate}/hour
              </p>
            </div>
          </div>

          {/* RIGHT SIDE — BOOKING FORM */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800">Booking Form</h2>

            <div className="space-y-4">

              <div>
                <label className="text-gray-600 font-medium">Your Name</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium">Start Time</label>
                <input
                  type="datetime-local"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium">End Time</label>
                <input
                  type="datetime-local"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium text-lg shadow transition"
              >
                Confirm Booking
              </button>

              {/* STATUS MESSAGE */}
              {statusMessage && (
                <p
                  className={`text-center font-medium mt-2 ${
                    statusMessage.startsWith("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {statusMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-10" />
    </div>
  );
}
