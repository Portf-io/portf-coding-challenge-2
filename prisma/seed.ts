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
    title: "Optimise performance",
    description:
      "For the sub-tasks request; create a function that, for each specific input, only makes 1 request to the database and always returns the same output.",
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
