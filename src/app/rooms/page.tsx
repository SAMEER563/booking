import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Room {
  id: string;
  roomNumber: string;
  name: string;
  baseHourlyRate: number;
  capacity: number;
}

async function getRooms(): Promise<Room[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rooms`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load rooms");
  }

  return res.json();
}

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-14 px-4">
      
 

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Available Rooms
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Select a workspace to proceed with the booking
        </p>
      </div>

      {/* ROOMS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:-translate-y-1"
          >
            {/* TOP BANNER */}
            <div className="h-36 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:opacity-90 transition" />

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {room.name}
              </h2>

              <div className="mt-3 space-y-1">
                <p className="text-gray-700">
                  <span className="font-medium">Room No:</span>{" "}
                  {room.roomNumber}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Capacity:</span>{" "}
                  {room.capacity} people
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Base Rate:</span>{" "}
                  ₹{room.baseHourlyRate}/hour
                </p>
              </div>

              {/* BUTTON */}
              <Link
                href={`/book?roomId=${room.id}`}
                className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium shadow-sm transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="h-20" />
    </div>
  );
}
