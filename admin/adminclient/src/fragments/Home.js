import React from "react";
import { Link } from "react-router-dom";
import "../CSS/background.css";
import "../CSS/character.css";

//this is home component
function Home(props) {
  return (
    <div className="backgroundColor">
      <div className="container row min-vh-100 min-vw-100">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 mt-5 p-5">
          <div className="row">
            <div
              className="card col-sm-4 mx-auto shadow rounded bg-custom-1 cardColor1 border-0 moveToCard"
              style={{ width: 300 }}
            >
              <Link to="/blockuser" className="card-body reduceUnderline ">
                <h5 className="card-title cardTitile1">Block / unblock</h5>
                <br></br>
                <p className="cardText">
                  Block and unblock a user account: blocking a user will not
                  allow a user to login until the admin unblocks the account
                </p>
              </Link>
            </div>
            <div
              className="card col-sm-4 mx-auto shadow rounded bg-custom-1 cardColor2 border-0 moveToCard"
              style={{ width: 300 }}
            >
              <Link to="/deletePost" className="card-body reduceUnderline">
                <h5 className="card-title cardTitile2">Delete posts</h5>
                <br></br>
                <p className="cardText">Delete posts if deemed inappropriate</p>
              </Link>
            </div>
            <div
              className="card col-sm-4 mx-auto shadow rounded bg-custom-1 border-0 cardColor3 moveToCard"
              style={{ width: 300 }}
            >
              <Link to="/followermetrics" className="card-body reduceUnderline">
                <h5 className="card-title cardTitile3">Follower metrics</h5>
                <br></br>
                <p className="cardText">Follower metrics for Top 10 bloggers</p>
              </Link>
            </div>
          </div>
          <div className="row mt-5">
            <div
              className="card col-sm-4 mx-auto shadow rounded bg-custom-1 border-0 cardColor4 moveToCard"
              style={{ width: 300 }}
            >
              <Link to="/profilemetrics" className="card-body reduceUnderline">
                <h5 className="card-title cardTitile4">Profile visits</h5>
                <br></br>
                <p className="cardText">
                  Show detail of profile visit for each user with the Line
                  Graph. Please select the User you want to look at and click
                  View Button.
                </p>
                <br></br>
              </Link>
            </div>
            <div
              className="card col-sm-4 mx-auto shadow rounded bg-custom-1 border-0 moveToCard cardColor5"
              style={{ width: 300 }}
            >
              <Link to="/reactionmetrics" className="card-body reduceUnderline">
                <h5 className="card-title cardTitile5">
                  User post reaction metrics
                </h5>
                <br></br>
                <p className="cardText">
                  Show count of post reaction for each User. Please select the
                  User you want to look at and click View Button.
                </p>
              </Link>
            </div>
            <div
              className="card col-sm-4 mx-auto shadow rounded bg-custom-1 border-0 moveToCard cardColor6"
              style={{ width: 300 }}
            >
              <Link to="/usagemetrics" className="card-body reduceUnderline">
                <h5 className="card-title cardTitile6">
                  Website Usage metrics
                </h5>
                <br></br>
                <p className="cardText">
                  The graph show number of users using LAN per day.
                </p>
              </Link>
            </div>
            <div className="col-sm-4"></div>
          </div>
          {/* <div className="row mt-5 mb-5">
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
