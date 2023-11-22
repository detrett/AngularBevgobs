import {Forum} from "./Forum";

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
