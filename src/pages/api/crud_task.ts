import { gql } from "@apollo/client";

export const CREATE_TASK_MUTATION = gql(`
  mutation CreateTask($title: String!, $description: String, $status: String!) {
    createTask(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
      createdAt
    }
  }
`);

export const GET_ALL_TASKS = gql(`
  query GetAllTask {
    getAllTasks {
      id
      title
      description
      status
      createdAt
    }
  }
`);

export const GET_TASK = gql(`
  query GetTask($id: Int!) {
    getTask(id: $id) {
      id
      title
      description
    }
  }
`);

export const DELETE_TASK_MUTATION = gql(`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`);

export const UPDATE_TASK_STATUS = gql(`
  mutation UpdateTaskStatus($id: Int!, $status: String!) {
    updateTask(id: $id, status: $status) {
      id
      status
    }
  }
`);
