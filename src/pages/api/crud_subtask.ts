import { gql } from "@apollo/client";

export const CREATE_SUBTASK_MUTATION = gql(`
    mutation CreateSubTask($title: String!, $description: String, $status: SubTaskStatusEnum!,  $taskId: Int!) {
        createSubTask(title: $title, description: $description, status: $status, taskId: $taskId) {
            id
            title
            description
            status
            taskId
        }
    }
`);

export const DELETE_SUBTASK_MUTATION = gql(`
  mutation DeleteSubTask($id: Int!) {
    deleteSubTask(id: $id) {
      id
    }
  }
`);

export const UPDATE_SUBTASK_STATUS = gql(`
  mutation UpdateSubTaskStatus($id: Int!, $status: SubTaskStatusEnum!) {
    updateSubTask(id: $id, status: $status) {
      id
      status
    }
  }
`);
