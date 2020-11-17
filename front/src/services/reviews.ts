import Axios from "axios";
import { APIErrorResponse } from "../shared/types/APIErrorResponse";
import { Review } from "../shared/types/Review";
import { ReviewWithUsers } from "../shared/types/ReviewWithUsers";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getReviews = async (): Promise<ReviewWithUsers[]> => {
  try {
    const reviews = await Axios.get(`${baseUrl}/reviews`);

    if (reviews.data?.length) {
      return reviews.data;
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getReview = async (
  reviewId: number
): Promise<Review | {}> => {
  try {
    const reviews = await Axios.get(`${baseUrl}/reviews/${reviewId}`);

    if (reviews.data) {
      return reviews.data;
    }

    return {};
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const createReview = async (
  review: Review
): Promise<Review | APIErrorResponse> => {
  try {
    return Axios.post(`${baseUrl}/reviews`, review);
  } catch (err) {
    console.error(err);

    return { success: false, message: err.message };
  }
};

export const updateReview = async (reviewPayload: {
  reviewId: number;
  content: string;
}): Promise<Review | APIErrorResponse> => {
  try {
    return Axios.patch(`${baseUrl}/reviews`, reviewPayload);
  } catch (err) {
    console.error(err);

    return { success: false, message: err.message };
  }
};
