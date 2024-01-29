import {
  objectType,
  extendType,
  enumType,
  nonNull,
  intArg,
  stringArg,
} from "nexus";
import { Task } from "nexus-prisma";
import { Context } from "./context";

// Task object
export const TaskType = objectType({
  name: Task.$name,
  description: Task.$description,
  definition(t) {
    t.nonNull.field(Task.id);
    t.nonNull.field(Task.title);
    t.field(Task.description);
    t.nonNull.field("status", {
      type: TaskStatusEnum,
    });
    t.nonNull.field(Task.createdAt);
  },
});

// Status enum
export const TaskStatusEnum = enumType({
  name: "TaskStatusEnum",
  members: ["COMPLETED", "IN_PROGRESS", "PENDING"],
});

// Get a single task
export const GetTaskQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx: Context) => {
        return ctx.prisma.task.findUnique({
          where: { id: args.id },
        });
      },
    });
  },
});

// Get all tasks
export const GetAllTaskQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllTasks", {
      type: "Task",
      resolve: (_parent, _args, ctx: Context) => {
        return ctx.prisma.task.findMany();
      },
    });
  },
});

// Create a task
export const CreateTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTask", {
      type: "Task",
      args: {
        title: nonNull(stringArg()),
        description: stringArg(),
        status: nonNull(TaskStatusEnum),
      },
      resolve: (_parent, args, ctx) => {
        if (!["PENDING", "IN_PROGRESS", "COMPLETED"].includes(args.status)) {
          throw new Error("Invalid status value");
        }
        return ctx.prisma.task.create({
          data: {
            title: args.title,
            description: args.description,
            status: args.status,
          },
        });
      },
    });
  },
});

// Get all subtasks for a Task
export const GetAllSubTasksForTaskQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getSubTasksForTask", {
      type: "SubTask",
      args: {
        taskId: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx: Context) => {
        return ctx.prisma.subTask.findMany({
          where: { taskId: args.taskId },
        });
      },
    });
  },
});

// Delete a task
export const DeleteTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.task.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

// Update a task
export const UpdateTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        description: stringArg(),
        status: TaskStatusEnum,
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.task.update({
          where: { id: args.id },
          data: {
            title: args.title,
            description: args.description,
            status: args.status,
          },
        });
      },
    });
  },
});
