// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var __prisma: PrismaClient | undefined;
}

/**
 * Prevent multiple PrismaClient instances in Next.js (hot reload)
 */
if (!global.__prisma) {
  console.log("[PRISMA] Creating new PrismaClient instance...");
  global.__prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
}

prisma = global.__prisma;

export default prisma;
