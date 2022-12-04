import React, { useContext } from "react";
import "../CSS/background.css";
import "../CSS/exploreButton.css";
import UserDetailContext from "../context/UserDetailContext";

function Home(props) {
  const { currentUser } = useContext(UserDetailContext);
  //handle the explore button
  const handlerExplore = () => {
    props.explore(true);
  };

  //handle the close button
  const handlerClose = () => {
    props.explore(false);
  };

  return (
    <div className="masthead backgroundImage">
      {currentUser !== null ? (
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <h1>Welcome! {currentUser.username}!</h1>
        </div>
      ) : props.exploreOnOrOff === true ? (
        <div className="container row min-vh-100 min-vw-100 character">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 mt-5 p-5">
            <div className="row">
              <div
                className="card col-sm-4 mx-auto shadow rounded bg-custom-1"
                style={{ width: 300 }}
              >
                <div className="card-body">
                  <h5 className="card-title">Sign in</h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    Main function 1
                  </h6>
                  <p className="card-text">
                    The Signup component will present a form with name, email,
                    and password fields to the user for sign-up.
                  </p>
                </div>
              </div>
              <div
                className="card col-sm-4 mx-auto shadow rounded bg-custom-1"
                style={{ width: 300 }}
              >
                <div className="card-body">
                  <h5 className="card-title">Sign up</h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    Main function 2
                  </h6>
                  <p className="card-text">
                    The Signin component is also a form with only email and
                    password fields for signing in.
                  </p>
                </div>
              </div>
              <div
                className="card col-sm-4 mx-auto shadow rounded bg-custom-1"
                style={{ width: 300 }}
              >
                <div className="card-body">
                  <h5 className="card-title">Porfile</h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    Main function 3
                  </h6>
                  <p className="card-text">
                    The Profile component shows a single user's information in
                    the main content area. The completed Profile will display
                    user details, and also the date of joining.
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div
                className="card col-sm-4 mx-auto shadow rounded bg-custom-1"
                style={{ width: 300 }}
              >
                <div className="card-body">
                  <h5 className="card-title">Edit Porfile</h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    Main function 4
                  </h6>
                  <p className="card-text">
                    Modify the profile component to add edit and delete
                    features. When the user is signed in viewing their own
                    profile, they will be able to see edit and delete options in
                    the Profile component.
                  </p>
                </div>
              </div>
              <div
                className="card col-sm-4 mx-auto shadow rounded bg-custom-1"
                style={{ width: 300 }}
              >
                <div className="card-body">
                  <h5 className="card-title">Posting</h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    Main function 5
                  </h6>
                  <p className="card-text">
                    Add another link to the navigation bar for the logged in
                    users.
                  </p>
                </div>
              </div>
              <div
                className="card col-sm-4 mx-auto shadow rounded bg-custom-1"
                style={{ width: 300 }}
              >
                <div className="card-body">
                  <h5 className="card-title">Follow / Unfollow</h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    Main function 6
                  </h6>
                  <p className="card-text">follow and unfollow another user</p>
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <div
                className="card col-sm-4 mx-auto shadow rounded bg-custom-1"
                style={{ width: 300 }}
              >
                <div className="card-body">
                  <h5 className="card-title"> Post reactions</h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    Main function 7
                  </h6>
                  <p className="card-text">
                    A core feature of any social media platform is the ability
                    for users to interact with shared content. For the posts
                    that are created on the LAN website, add the options to like
                    and dislike individual posts.
                  </p>
                </div>
              </div>
              <div
                className="card col-sm-4 mx-auto shadow rounded bg-custom-1"
                style={{ width: 300 }}
              >
                <div className="card-body">
                  <h5 className="card-title">Eidt Post</h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    Main function 8
                  </h6>
                  <p className="card-text">
                    User should be allowed to edit or delete their post
                  </p>
                </div>
              </div>
              <div
                className="card col-sm-4 mx-auto shadow rounded bg-custom-1"
                style={{ width: 300 }}
              >
                <div className="card-body">
                  <h5 className="card-title">2-level Reply</h5>
                  <h6 className="card-subtitle mb-3 text-muted">
                    Main function 9
                  </h6>
                  <p className="card-text">
                    User may reply to a post made by another user. The replied
                    post must be displayed in a threaded format.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-4 moveClose">
                <button
                  type="submit"
                  onClick={handlerClose}
                  className="btn-close btn-close-dark shadow rounded mt-5 "
                  value="login"
                ></button>
              </div>
              <div className="col-sm-4"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <h1>This is our fantastic social media website</h1>
          <button
            type="button"
            onClick={handlerExplore}
            className="btn btn-outline-primary btn-lg changeButton"
          >
            explore
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
