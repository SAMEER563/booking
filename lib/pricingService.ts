// lib/pricingService.ts
import { DateTime } from "luxon";
import { toIST } from "./timeUtils";

export function calculateTotalPrice(
  startIso: string,
  endIso: string,
  baseHourlyRate: number
): number {
  const start = toIST(startIso);
  const end = toIST(endIso);

  if (end <= start) return 0;

  const totalMinutes = Math.round(end.diff(start, "minutes").minutes);
  const perMinuteRate = baseHourlyRate / 60;

  const peakSlots = [
    { start: 10, end: 13 },
    { start: 16, end: 19 }
  ];

  let total = 0;

  for (let i = 0; i < totalMinutes; i++) {
    const t = start.plus({ minutes: i });

    const weekday = t.weekday >= 1 && t.weekday <= 5;
    let multiplier = 1;

    if (weekday) {
      for (const slot of peakSlots) {
        const hour = t.hour + t.minute / 60;
        if (hour >= slot.start && hour < slot.end) {
          multiplier = 1.5;
          break;
        }
      }
    }

    total += perMinuteRate * multiplier;
  }

  return Math.round(total);
}
