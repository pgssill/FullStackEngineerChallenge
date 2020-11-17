export interface Review {
  id?: number;
  reviewerId: number;
  revieweeId: number;
  completed?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
  content?: string;
}
