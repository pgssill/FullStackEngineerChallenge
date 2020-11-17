import React, { useEffect, useState } from "react";
import { getReviews } from "../services/reviews";
import { ReviewWithUsers } from "../shared/types/ReviewWithUsers";
import { ReviewItem } from "./ReviewItem";

type Props = {
  createReviewRoute: Function;
};

export const ReviewList = (props: Props) => {
  const [reviews, setReviews] = useState<ReviewWithUsers[]>([]);

  const updateReviewList = () => {
    getReviews().then((reviews) => setReviews(reviews));
  };

  useEffect(updateReviewList, []);

  return (
    <div>
      <h2>Review List</h2>

      <button onClick={() => props.createReviewRoute()}>Create Review</button>

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <div>
              <div>
                #{review.id}&nbsp;
                <strong>
                  {review.reviewerId.firstName} {review.reviewerId.lastName}
                  &nbsp; -&gt; {review.revieweeId.firstName}{" "}
                  {review.revieweeId.lastName}
                  <span className="review-status">
                    {review.completed ? "Complete" : "Pending"}
                  </span>
                </strong>
              </div>
              <ReviewItem
                reviewId={review.id}
                reviewee={review.revieweeId}
                updateReviewList={updateReviewList}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
