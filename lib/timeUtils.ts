// lib/timeUtils.ts
import { DateTime } from "luxon";

export const ZONE = "Asia/Kolkata";

export function toIST(input: string | Date) {
  if (typeof input === "string") {
    return DateTime.fromISO(input, { zone: "utc" }).setZone(ZONE);
  }
  return DateTime.fromJSDate(input).setZone(ZONE);
}

export function nowIST() {
  return DateTime.now().setZone(ZONE);
}

export function toJSDate(dt: DateTime) {
  return dt.toJSDate();
}
