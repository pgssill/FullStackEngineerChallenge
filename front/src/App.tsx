import React, { useState } from "react";
import { CreateReview } from "./components/CreateReview";
import { CreateUser } from "./components/CreateUser";
import { ReviewList } from "./components/ReviewList";
import { UserList } from "./components/UserList";

enum NavState {
  UserList,
  CreateUser,
  ReviewList,
  CreateReview,
}

const App = () => {
  const [navState, setNavState] = useState<NavState>(0);

  const returnNavLocation = () => {
    switch (navState) {
      case NavState.UserList:
        return (
          <UserList createUserRoute={() => setNavState(NavState.CreateUser)} />
        );
      case NavState.CreateUser:
        return (
          <CreateUser userListRoute={() => setNavState(NavState.UserList)} />
        );
      case NavState.ReviewList:
        return (
          <ReviewList
            createReviewRoute={() => setNavState(NavState.CreateReview)}
          />
        );
      case NavState.CreateReview:
        return (
          <CreateReview
            reviewListRoute={() => setNavState(NavState.ReviewList)}
          />
        );
      default:
        return (
          <UserList createUserRoute={() => setNavState(NavState.CreateUser)} />
        );
    }
  };

  return (
    <div className="App">
      <nav className="header">
        <div className="brand">ReviewApp</div>

        <label htmlFor="nav-mobile" className="nav-mobile">
          Menu
        </label>
        <input type="checkbox" id="nav-mobile" className="nav-mobile" />
        <div className="nav-items">
          <label htmlFor="nav-mobile" >
            <div
              className="nav-btn"
              onClick={() => setNavState(NavState.UserList)}
            >
              Users
            </div>
          </label>
          <label htmlFor="nav-mobile" >
            <div
              className="nav-btn"
              onClick={() => setNavState(NavState.CreateUser)}
            >
              Create User
            </div>
          </label>
          <label htmlFor="nav-mobile" >
            <div
              className="nav-btn"
              onClick={() => setNavState(NavState.ReviewList)}
            >
              Reviews
            </div>
          </label>
          <label htmlFor="nav-mobile" >
            <div
              className="nav-btn"
              onClick={() => setNavState(NavState.CreateReview)}
            >
              Create Review
            </div>
          </label>
        </div>
      </nav>

      <div className="main-content">{returnNavLocation()}</div>
    </div>
  );
};

export default App;
