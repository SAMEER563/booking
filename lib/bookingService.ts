// lib/bookingService.ts
import prisma from "./prisma";
import { calculateTotalPrice } from "./pricingService";
import { validateTimes } from "./validation";
import { toIST, nowIST, toJSDate } from "./timeUtils";

export type BookingErrorCode =
  | "VALIDATION_ERROR"
  | "ROOM_NOT_FOUND"
  | "CONFLICT"
  | "NOT_FOUND"
  | "TOO_LATE"
  | "ALREADY_CANCELLED";

export interface BookingError {
  code: BookingErrorCode;
  message: string;
}

function throwError(code: BookingErrorCode, message: string): never {
  throw { code, message } satisfies BookingError;
}

export async function createBooking(
  roomId: string,
  userName: string,
  startIso: string,
  endIso: string
) {
  const validation = validateTimes(startIso, endIso);
  if (!validation.ok) {
    throwError("VALIDATION_ERROR", validation.message);
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId }
  });

  if (!room) throwError("ROOM_NOT_FOUND", "Room not found");

  const conflict = await prisma.booking.findFirst({
    where: {
      roomId,
      status: "CONFIRMED",
      startTime: { lt: toJSDate(toIST(endIso)) },
      endTime: { gt: toJSDate(toIST(startIso)) }
    }
  });

  if (conflict) {
    throwError(
      "CONFLICT",
      `Room already booked from ${conflict.startTime.toISOString()} to ${conflict.endTime.toISOString()}`
    );
  }

  const totalPrice = calculateTotalPrice(startIso, endIso, room.baseHourlyRate);

  return prisma.booking.create({
    data: {
      roomId,
      userName,
      startTime: toJSDate(toIST(startIso)),
      endTime: toJSDate(toIST(endIso)),
      totalPrice,
      status: "CONFIRMED"
    }
  });
}

export async function cancelBooking(id: string) {
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) throwError("NOT_FOUND", "Booking not found");

  if (booking.status === "CANCELLED") {
    throwError("ALREADY_CANCELLED", "Booking already cancelled");
  }

  const now = nowIST();
  const start = toIST(booking.startTime);

  if (now.plus({ hours: 2 }) > start) {
    throwError("TOO_LATE", "Cancellation allowed only if >2 hours before start");
  }

  return prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" }
  });
}
