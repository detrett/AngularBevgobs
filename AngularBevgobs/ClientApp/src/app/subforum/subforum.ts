import { IForum } from "../forum/forum";
import { IThread } from "../thread/thread";

export interface ISubforum {
  SubforumId: number;
  Name: string;
  Description: string;
  BackgroundColor: string;
  ParentId: number;
  CurrentPage: number;
  Threads: IThread[];
}
