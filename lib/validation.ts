// lib/validation.ts
import { toIST } from "./timeUtils";

export function validateTimes(startIso: string, endIso: string) {
  const start = toIST(startIso);
  const end = toIST(endIso);

  if (end <= start) {
    return { ok: false, message: "startTime must be before endTime" };
  }

  const duration = end.diff(start, "hours").hours;
  if (duration > 12) {
    return { ok: false, message: "Maximum duration is 12 hours" };
  }

  return { ok: true, message: "" };
}
