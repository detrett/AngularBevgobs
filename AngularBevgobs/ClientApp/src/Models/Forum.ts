import {Subforum} from "./Subforum";

export interface Forum {
  forumId: number;
  name: string;

  subforums?: Subforum[];
}
