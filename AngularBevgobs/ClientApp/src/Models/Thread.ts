import {Subforum} from "./Subforum";

export interface Thread {
  threadId: number;
  userId: number;
  name: string;
  createdAt: Date;
  description: string;
  subforumId: number;


  isLocked?: boolean;
  isAnnouncement?: boolean;
  isPinned?: boolean;
  isFeatured?: boolean;


  comments?: Comment[];
  parentSubforum?: Subforum;
}
