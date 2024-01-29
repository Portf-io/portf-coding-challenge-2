import {
  objectType,
  extendType,
  enumType,
  nonNull,
  intArg,
  stringArg,
} from "nexus";
import { SubTask } from "nexus-prisma";
import { Context } from "./context";

// SubTask object
export const SubTaskType = objectType({
  name: SubTask.$name,
  description: SubTask.$description,
  definition(t) {
    t.nonNull.field(SubTask.id);
    t.nonNull.field(SubTask.title);
    t.field(SubTask.description);
    t.nonNull.field("status", {
      type: SubTaskStatusEnum,
    });
    t.nonNull.field(SubTask.createdAt);
    t.nonNull.field(SubTask.taskId);
    t.nonNull.field(SubTask.task);
  },
});

// Status enum
export const SubTaskStatusEnum = enumType({
  name: "SubTaskStatusEnum",
  members: ["COMPLETED", "IN_PROGRESS", "PENDING"],
});

// Get a single subtask
export const GetSubTaskQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getSubTask", {
      type: "SubTask",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx: Context) => {
        return ctx.prisma.subTask.findUnique({
          where: { id: args.id },
        });
      },
    });
  },
});

// Get all subtasks
export const GetAllSubTaskQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllSubTasks", {
      type: "SubTask",
      resolve: (_parent, _args, ctx: Context) => {
        return ctx.prisma.subTask.findMany();
      },
    });
  },
});

// Create a subtask
export const CreateSubTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createSubTask", {
      type: "SubTask",
      args: {
        title: nonNull(stringArg()),
        description: stringArg(),
        status: nonNull(SubTaskStatusEnum),
        taskId: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        if (!["PENDING", "IN_PROGRESS", "COMPLETED"].includes(args.status)) {
          throw new Error("Invalid status value");
        }
        return ctx.prisma.subTask.create({
          data: {
            title: args.title,
            description: args.description,
            status: args.status,
            taskId: args.taskId,
          },
        });
      },
    });
  },
});

// Delete a subtask
export const DeleteSubTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteSubTask", {
      type: "SubTask",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.subTask.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

// Update a task
export const UpdateSubTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateSubTask", {
      type: "SubTask",
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        description: stringArg(),
        status: SubTaskStatusEnum,
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.subTask.update({
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
