// app/api/bookings/[id]/cancel/route.ts

import { NextResponse } from "next/server";
import { cancelBooking, BookingError, BookingErrorCode } from "@/lib/bookingService";

// ✅ Next.js 15: params is now Promise<{ id: string }>
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ Await the params
  const { id } = await context.params;

  try {
    const updated = await cancelBooking(id);

    return NextResponse.json(
      {
        success: true,
        bookingId: updated.id,
        status: updated.status,
      },
      { status: 200 }
    );
  } catch (error) {
    const e = error as BookingError;

    return NextResponse.json(
      { error: e.message },
      { status: mapCancelError(e.code) }
    );
  }
}

function mapCancelError(code: BookingErrorCode): number {
  switch (code) {
    case "NOT_FOUND":
      return 404;
    case "TOO_LATE":
    case "ALREADY_CANCELLED":
      return 400;
    default:
      return 500;
  }
}