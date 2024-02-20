import {
  intArg,
  makeSchema,
  objectType,
  asNexusMethod,
  nonNull,
  inputObjectType,
  list
} from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { Context } from "./context";
import path from "path";
import { Task } from "nexus-prisma";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

export const filterInputType = inputObjectType({
  name: "FilterInput",
  definition(t) {
    t.string("title");
    t.string("status");
  }
});

export const createTaskInputType = inputObjectType({
  name: "CreateTaskInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
  }
});

export const updateTaskInputType = inputObjectType({
  name: "UpdateTaskInput",
  definition(t) {
    t.string("title");
    t.string("status");
    t.string("description");
  }
});

export const schema = makeSchema({
  types: [
    DateTime,
    objectType({
      name: "Query",
      definition(t) {
        t.field("getTask", {
          type: "Task",
          args: {
            id: nonNull(intArg())
          },
          resolve: (_parent, args, ctx: Context) => {
            return ctx.prisma.task.findUnique({
              where: { id: args.id }
            });
          }
        });
        t.field("getTasks", {
          type: nonNull(list(nonNull("Task"))),
          args: {
            filter: filterInputType
          },
          resolve: (_parent, args, ctx: Context) => {
            return ctx.prisma.task.findMany({
              where: { ...args.filter }
            });
          }
        });
      }
    }),
    objectType({
      name: "Mutation",
      definition(t) {
        t.nonNull.field("createTask", {
          type: "Task",
          args: {
            input: nonNull(createTaskInputType)
          },
          resolve: (_, args, ctx: Context) => {
            return ctx.prisma.task.create({
              data: {
                ...args.input,
                status: "TO_DO"
              }
            });
          }
        });
        t.nonNull.field("updateTask", {
          type: "Task",
          args: {
            id: nonNull(intArg()),
            input: nonNull(updateTaskInputType)
          },
          resolve: (_, args, ctx: Context) => {
            return ctx.prisma.task.update({
              where: { id: args.id },
              data: args.input
            });
          }
        });
        t.nonNull.field("deleteTask", {
          type: "Task",
          args: {
            id: nonNull(intArg())
          },
          resolve: (_, args, ctx: Context) => {
            return ctx.prisma.task.delete({
              where: { id: args.id }
            });
          }
        });
      }
    }),
    objectType({
      name: Task.$name,
      description: Task.$description,
      definition(t) {
        t.nonNull.field(Task.id);
        t.nonNull.field(Task.title);
        t.field(Task.description);
        t.nonNull.field(Task.status);
        t.nonNull.field(Task.createdAt);
      }
    })
  ],
  outputs: {
    schema: path.join(process.cwd(), "src", "graphql-server", "schema.graphql"),
    typegen: path.join(process.cwd(), "src", "graphql-server", "types.ts")
  },
  contextType: {
    module: path.join(process.cwd(), "src", "graphql-server", "context.ts"),
    export: "Context"
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma"
      }
    ]
  }
});
