import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  tasks: any[];
}

const User: {
  findOne(query: Partial<IUser>): Promise<IUser | null>;
} = {} as any;

export default User;
