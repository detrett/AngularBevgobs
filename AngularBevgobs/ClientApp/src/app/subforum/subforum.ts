import { IForum } from "../forum/forum";
import { IThread } from "../thread/thread";

export interface ISubforum {
  SubforumId: number;
  Name: string;
  Description: string;
  ForumId: number;
  ParentForum: IForum;
  Threads: IThread[];
}
