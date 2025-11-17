import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createBooking, BookingError, BookingErrorCode } from "@/lib/bookingService";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: { room: true },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const body = await req.json();

  const roomId = typeof body.roomId === "string" ? body.roomId : null;
  const userName = typeof body.userName === "string" ? body.userName : null;
  const startTime = typeof body.startTime === "string" ? body.startTime : null;
  const endTime = typeof body.endTime === "string" ? body.endTime : null;

  if (!roomId || !userName || !startTime || !endTime) {
    return NextResponse.json(
      { error: "Missing or invalid required fields" },
      { status: 400 }
    );
  }

  try {
    const booking = await createBooking(roomId, userName, startTime, endTime);

    return NextResponse.json(
      {
        bookingId: booking.id,
        roomId: booking.roomId,
        userName: booking.userName,
        totalPrice: booking.totalPrice,
        status: booking.status
      },
      { status: 201 }
    );
  } catch (error) {
    const e = error as BookingError;

    return NextResponse.json(
      { error: e.message },
      { status: mapError(e.code) }
    );
  }
}

function mapError(code: BookingErrorCode): number {
  switch (code) {
    case "VALIDATION_ERROR":
      return 400;
    case "ROOM_NOT_FOUND":
      return 404;
    case "CONFLICT":
      return 409;
    default:
      return 500;
  }
}
