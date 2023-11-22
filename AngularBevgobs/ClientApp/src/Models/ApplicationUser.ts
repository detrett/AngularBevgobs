export interface ApplicationUser {
  id: number;
  userName: string;
  email: string;
  createdAt: Date;
  rank?: string;
  userPhoto?: string;
}
