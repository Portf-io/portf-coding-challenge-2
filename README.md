# PortF Task Manager
by Ton Hoang Nguyen (Bill)

<img width="1000" alt="PortF Task Manager Home Page" src="https://github.com/HahaBill/portf-task-manager-bill/assets/32552798/2e8fd584-2c4c-4379-b4c6-017a14f56e88">


## 📄 What is PortF Task Manager

A simple Task Management Application that allows users to create, update, delete, and view tasks. This is created from the coding challenge by PortF with these instructions:

1. Some guide tasks are provided in `prisma/seed.ts`

2. Complete as many as you want (or add more) in as much detail as you like.

3. There may be some bugs and you are also free to change any configuration if you want to.

```typescript
/*
 GraphQL Schema Overview
*/

type Mutation {
  createSubTask(description: String, status: SubTaskStatusEnum!, taskId: Int!, title: String!): SubTask!
  createTask(description: String, status: TaskStatusEnum!, title: String!): Task!
  deleteSubTask(id: Int!): SubTask
  deleteTask(id: Int!): Task
  updateSubTask(description: String, id: Int!, status: SubTaskStatusEnum, title: String): SubTask
  updateTask(description: String, id: Int!, status: TaskStatusEnum, title: String): Task
}

type Query {
  getAllSubTasks: [SubTask]
  getAllTasks: [Task]
  getSubTask(id: Int!): SubTask
  getSubTasksForTask(taskId: Int!): [SubTask]
  getTask(id: Int!): Task
}

type SubTask {
  createdAt: DateTime!
  description: String
  id: Int!
  status: SubTaskStatusEnum!
  task: Task!
  taskId: Int!
  title: String!
}

enum SubTaskStatusEnum {
  COMPLETED
  IN_PROGRESS
  PENDING
}

type Task {
  createdAt: DateTime!
  description: String
  id: Int!
  status: TaskStatusEnum!
  title: String!
}

enum TaskStatusEnum {
  COMPLETED
  IN_PROGRESS
  PENDING
}

```


## 🚀  Getting Started

It is a NextJS app with the following integrations:

- Prisma ORM with SQLite
- Nexus (GraphQL schema generation)
- Apollo Server
- Apollo Client
- GraphQL Code Generator (for apollo client requests)
- Node v20 is recommended.

### NPM

Kick off with an npm install

```
npm i
```

### Prisma

Migrate and seed your db

```
npx prisma migrate dev --name init
```

### Generate types

Generate your API and front-end types (remember to re-run these if you make any changes to your schema)

```
npm run generate
npm run codegen
```

### Run

Run the NextJS dev server

```bash
npm run dev
```

Which can be viewed here: http://localhost:3000

The GraphQL api can be viewed here: http://localhost:3000/api/graphql
