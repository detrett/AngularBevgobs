import { IComment } from "../comment/comment";
import { IThread } from "../thread/thread";

export interface IUser {
  CreatedAt: Date;
  Rank: string;
  Username: string;
  UserPhoto: File;
  Threads: IThread[];
  UserComments: IComment[];
}
