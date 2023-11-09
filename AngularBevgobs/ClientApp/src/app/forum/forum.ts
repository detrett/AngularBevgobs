import { ISubforum } from "../subforum/subforum";

export interface IForum {
  ForumId: number;
  Name: string;
  Subforums: ISubforum[];
}
