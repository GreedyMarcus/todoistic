import { Status } from './status';

export interface Todo {
  id: number;
  title: string;
  description: string;
  due: Date;
  status: Status;
  priority: number;
}