import { User } from "./User";

export interface ReviewWithUsers {
  id: number;
  reviewerId: User;
  revieweeId: User;
  completed: boolean;
  updatedAt: Date;
  createdAt: Date;
  content: string;
}
