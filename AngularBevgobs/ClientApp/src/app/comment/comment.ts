import { IThread } from "../thread/thread";
import { IUser } from "../user/user";

export interface IComment {
  CommentId: number;
  Title: string;
  Body: string;
  ThreadId: number;
  ParentThread: IThread;
  UserId: number;
  Author: IUser;
  CreatedAt: Date;
}
