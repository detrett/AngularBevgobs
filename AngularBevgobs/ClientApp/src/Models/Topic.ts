import {ApplicationUser} from "./ApplicationUser";
import {Subforum} from "./Subforum";

export interface Topic {
  topicId: number;
  name: string;
  createdAt: Date;
  isLocked: boolean;
  isAnnouncement: boolean;
  isPinned: boolean;
  isFeatured: boolean;
  subforumId: number;


  user?: ApplicationUser;
  parentSubforum?: Subforum;
  comments?: Comment[];
  lastComment?: Comment;
}
