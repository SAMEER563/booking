// prisma/seed.js

/**
 * Prisma seed script (JavaScript version)
 * Run using: npx prisma db seed
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed script...");

  const rooms = [
    {
      roomNumber: "101",
      name: "Cabin 1",
      baseHourlyRate: 350,
      capacity: 4,
    },
    {
      roomNumber: "102",
      name: "Conference Room A",
      baseHourlyRate: 700,
      capacity: 8,
    },
    {
      roomNumber: "103",
      name: "Huddle Room",
      baseHourlyRate: 250,
      capacity: 2,
    },
  ];

  for (const data of rooms) {
    console.log(`➡️ Checking room ${data.roomNumber}...`);

    const exists = await prisma.room.findFirst({
      where: { roomNumber: data.roomNumber },
    });

    if (!exists) {
      const created = await prisma.room.create({ data });
      console.log(`✨ Created room ${created.roomNumber} (id=${created.id})`);
    } else {
      console.log(`✔ Room ${data.roomNumber} already exists`);
    }
  }

  console.log("🌱 Seed completed!");
}

main()
  .catch((err) => {
    console.error("❌ Seed error:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
