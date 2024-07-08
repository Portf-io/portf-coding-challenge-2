import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const taskData: Prisma.TaskCreateInput[] = [
  {
    title: "Create",
    description: "Create a new task",
    status: "TO_DO",
    createdAt: new Date(),
  },
  {
    title: "List",
    description: "Display tasks in a list",
    status: "TO_DO",
    createdAt: new Date(),
  },
  {
    title: "Support sub-tasks",
    description: "Add support for array of sub-tasks on a task",
    status: "TO_DO",
    createdAt: new Date(),
  },
  {
    title: "Optimise BE performance across multiple clients",
    description:
      "For the sub-tasks request; Create a generic backend function that accepts another function as an argument, executes it once to fetch data from the database, and caches the result for subsequent calls. This caching mechanism ensures that for any given function passed as an argument, the same data is always returned while only making one database request.",
    status: "TO_DO",
    createdAt: new Date(),
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const t of taskData) {
    const task = await prisma.task.create({
      data: t,
    });
    console.log(`Created task with id: ${task.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
