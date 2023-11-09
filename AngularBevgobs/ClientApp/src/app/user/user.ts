import { IComment } from "../comment/comment";
import { IThread } from "../thread/thread";

export interface IUser {
  UserId: number;
  Rank: string;
  Password: string;
  UserPhoto: File;
  Threads: IThread[];
  Comments: IComment[];
}
