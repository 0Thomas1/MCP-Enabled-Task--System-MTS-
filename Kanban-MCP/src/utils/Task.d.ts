import { Document } from "mongoose";
import { IUser } from "./User";

export interface ITask extends Document {
  title: string;
  description: string;
  taskStatus: "todo" | "inProgress" | "done";
  priority: "low" | "medium" | "high";
  tags: string[];
  dueDate?: Date;
  user?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

const Task: {
  create(data: Partial<ITask>): Promise<ITask>;
  find(query: any): Promise<ITask[]>;
  findById(id: string): Promise<ITask | null>;
} = {} as any;

export default Task;
