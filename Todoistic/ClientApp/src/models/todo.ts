import { Status } from "./status";

export interface Todo {
  todoItemID: number;
  title: string;
  description: string;
  due: Date;
  statusID: Status;
  priority: number;
}