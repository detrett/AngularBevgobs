import { IComment } from "../comment/comment";
import { ISubforum } from "../subforum/subforum";
import { IUser } from "../user/user";

export interface IThread {
  ThreadId: number;
  Name: string;
  Description: string;
  UserId: number;
  User: IUser;
  SubforumId: number;
  ParentSubforum: ISubforum;
  Comments: IComment[];
  CreatedAt: Date;
  IsLocked: boolean;
  IsPinned: boolean;
  IsFeatured: boolean;
  IsAnnouncement: boolean;
}
