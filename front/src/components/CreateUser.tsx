import React, { useEffect, useState } from "react";
import { createUser } from "../services/users";

type State = {
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};
type Props = {
  userListRoute: Function;
};

export const CreateUser = (props: Props) => {
  const [formState, changeFormState] = useState<State>({
    firstName: "",
    lastName: "",
    isAdmin: false,
  });
  const [canSubmitUser, setCanSubmitUser] = useState(false);

  const handleInput = (e: { target: HTMLInputElement }) => {
    const { name, type, checked } = e.target;
    const value = type === "checkbox" ? checked : e.target.value;

    changeFormState({ ...formState, [name]: value });
  };

  const validateForm = () => {
    if (formState.firstName.length > 0 && formState.lastName.length > 0) {
      setCanSubmitUser(true);
    } else {
      setCanSubmitUser(false);
    }
  };

  const submitUser = async () => {
    if (!canSubmitUser) {
      return;
    }

    try {
      setCanSubmitUser(false);
      await createUser(formState);

      props.userListRoute();
    } catch (error) {
      console.log(error);
      validateForm();
    }
  };

  useEffect(validateForm, [formState]);

  return (
    <div>
      <h2>Create User</h2>

      <div>
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          onChange={handleInput}
          value={formState.firstName}
        />
      </div>

      <div>
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          onChange={handleInput}
          value={formState.lastName}
        />
      </div>

      <div>
        <label>Make Admin: </label>
        <input
          type="checkbox"
          name="isAdmin"
          onChange={handleInput}
          checked={formState.isAdmin}
        />
      </div>

      <button type="submit" onClick={submitUser} disabled={!canSubmitUser}>
        Create User
      </button>
    </div>
  );
};
