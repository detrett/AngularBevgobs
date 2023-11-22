export interface Comment {
  commentId: number;
  threadId: number;
  userId: number;
  title?: string;
  body?: string;
  createdAt: Date;
}
