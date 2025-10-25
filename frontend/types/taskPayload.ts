import { Task } from "./task";

export type TaskPayload = {
  tasks: Task[];
  totalCount: number;
  totalPages: number;
};
