import React, { useEffect, useState } from "react";
import { getReview, updateReview } from "../services/reviews";
import { Review } from "../shared/types/Review";
import { ReviewWithUsers } from "../shared/types/ReviewWithUsers";

type Props = {
  reviewId: number;
  reviewee: ReviewWithUsers["revieweeId"];
  updateReviewList: Function;
};

export const ReviewItem = (props: Props) => {
  const [content, setContent] = useState("");
  const [canSubmitReviewContent, setCanSubmitReviewContent] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const updateReviewList = () => {
    getReview(props.reviewId).then((review) => {
      const content = (review as Review).content;
      if (content) {
        setContent(content);
      }
    });
  };
  useEffect(updateReviewList, [props.reviewId]);

  const handleInput = (e: { target: HTMLTextAreaElement }) => {
    const { value } = e.target;

    setContent(value);
  };

  const validateForm = () => {
    if (content.length > 10) {
      setCanSubmitReviewContent(true);
    } else {
      setCanSubmitReviewContent(false);
    }
  };
  useEffect(validateForm, [content]);

  const submitReviewContent = async () => {
    if (!canSubmitReviewContent) {
      return;
    }

    try {
      setCanSubmitReviewContent(false);
      await updateReview({
        reviewId: props.reviewId,
        content,
      });

      setContent("");

      props.updateReviewList();
      setOpen(false);
    } catch (error) {
      console.log(error);
      validateForm();
    }
  };

  const revieweeName = `${props.reviewee.firstName} ${props.reviewee.lastName}`;

  if (!isOpen) {
    return (
      <div>
        <button className="review-see-more" onClick={() => setOpen(true)}>See more ↓</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        Reviewee: <strong>{revieweeName}</strong>.
      </div>

      <div>
        <textarea value={content} onChange={handleInput}></textarea>
      </div>

      <div>
        <button
          type="submit"
          onClick={submitReviewContent}
          disabled={!canSubmitReviewContent}
        >
          Submit
        </button>
        <button onClick={() => setOpen(false)}>See less ↑</button>
      </div>
    </div>
  );
};
