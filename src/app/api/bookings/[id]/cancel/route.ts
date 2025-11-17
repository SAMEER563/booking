import { NextResponse } from "next/server";
import { cancelBooking, BookingError, BookingErrorCode } from "@/lib/bookingService";

type Params = { params: { id: string } };

export async function POST(req: Request, { params }: Params) {
  try {
    const updated = await cancelBooking(params.id);

    return NextResponse.json(
      {
        success: true,
        bookingId: updated.id,
        status: updated.status
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
