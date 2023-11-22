import {Forum} from "./Forum";
import {Thread} from "./Thread";

export interface Subforum {
  subforumId: number;
  name: string;
  description: string;
  backgroundColor?: string;
  forumId: number;

  parentForum?: Forum;
  currentPage: number;
  threads?: Thread[];
}
