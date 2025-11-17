import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import { ZONE } from "@/lib/timeUtils";

interface AnalyticsResult {
  roomId: string;
  roomName: string;
  totalHours: number;
  totalRevenue: number;
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json(
      { error: "Query params 'from' and 'to' are required" },
      { status: 400 }
    );
  }

  const fromDate = DateTime.fromISO(from, { zone: ZONE }).startOf("day");
  const toDate = DateTime.fromISO(to, { zone: ZONE }).endOf("day");

  const bookings = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
      startTime: {
        gte: fromDate.toJSDate(),
        lte: toDate.toJSDate(),
      },
    },
    include: { room: true },
  });

  type BookingWithRoom = (typeof bookings)[number];

  const map: Record<string, AnalyticsResult> = {};

  bookings.forEach((b: BookingWithRoom) => {
    if (!map[b.roomId]) {
      map[b.roomId] = {
        roomId: b.roomId,
        roomName: b.room.name,
        totalHours: 0,
        totalRevenue: 0,
      };
    }

    const start = DateTime.fromJSDate(b.startTime, { zone: ZONE });
    const end = DateTime.fromJSDate(b.endTime, { zone: ZONE });

    map[b.roomId].totalHours += end.diff(start, "hours").hours;
    map[b.roomId].totalRevenue += b.totalPrice;
  });

  return NextResponse.json(Object.values(map), { status: 200 });
}
