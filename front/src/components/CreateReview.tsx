import React, { useEffect, useState } from "react";
import { createReview } from "../services/reviews";
import { getUsers } from "../services/users";
import { User } from "../shared/types/User";

enum Role {
  Reviewer,
  Reviewee,
}
type State = {
  [Role.Reviewer]: number;
  [Role.Reviewee]: number;
};
const initialState = {
  [Role.Reviewer]: 0,
  [Role.Reviewee]: 0,
};
type Props = {
  reviewListRoute: Function;
};

export const CreateReview = (props: Props) => {
  const [formState, changeFormState] = useState<State>(initialState);
  const [canSubmitReview, setCanSubmitReview] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  const handleChange = (userId: number, role: Role) => {
    changeFormState({ ...formState, [role]: userId });
  };

  const validateForm = () => {
    if (
      formState[Role.Reviewer] !== 0 &&
      formState[Role.Reviewee] !== 0 &&
      formState[Role.Reviewer] !== formState[Role.Reviewee]
    ) {
      setCanSubmitReview(true);
    } else {
      setCanSubmitReview(false);
    }
  };

  const submitReview = async () => {
    if (!canSubmitReview) {
      return;
    }

    try {
      setCanSubmitReview(false);
      await createReview({
        reviewerId: formState[Role.Reviewer],
        revieweeId: formState[Role.Reviewee],
      });

      props.reviewListRoute();
    } catch (error) {
      console.log(error);
      validateForm();
    }
  };

  useEffect(validateForm, [formState]);

  return (
    <div>
      <h2>Create Review</h2>

      <div>
        <p>
          <strong>Reviewer</strong>
        </p>
        {users.map(
          (user) =>
            user.id && (
              <button
                key={user.id}
                onClick={() => handleChange(user.id as number, 0)}
                disabled={formState[Role.Reviewee] === user.id}
                className={
                  formState[Role.Reviewer] === user.id
                    ? "selected"
                    : "not-selected"
                }
              >
                {user.firstName} {user.lastName}
              </button>
            )
        )}
      </div>
      <div>
        <p>
          <strong>Reviewee</strong>
        </p>
        {users.map(
          (user) =>
            user.id && (
              <button
                key={user.id}
                onClick={() => handleChange(user.id as number, 1)}
                disabled={formState[Role.Reviewer] === user.id}
                className={
                  formState[Role.Reviewee] === user.id
                    ? "selected"
                    : "not-selected"
                }
              >
                {user.firstName} {user.lastName}
              </button>
            )
        )}
      </div>

      <button type="submit" onClick={submitReview} disabled={!canSubmitReview}>
        Create Review
      </button>
    </div>
  );
};
