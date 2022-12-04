import React, { useContext } from "react";
import "../CSS/post.css";
import "../CSS/loginsignup.css";
import "../CSS/icon.css";
import "../CSS/reply.css";
import "../CSS/followedList.css";
import FollowingUser from "./FollowingUser";
import FollowingListContext from "../context/FollowingListContext";
import UnFollowListContext from "../context/UnFollowListContext";

//this is 2 level reply in the post
const FollowedList = (props) => {
  // eslint-disable-next-line
  const { followList } = useContext(FollowingListContext);
  const { unFollowList } = useContext(UnFollowListContext);

  return (
    <div className="row sticky-top">
      <div className="col-sm-2"></div>
      <div className="col-sm-6 mx-auto card card-body border border-1 shadow p-0 submit reduceradius mb-5 listHeight">
        <div className="card-header p-3 headerCharacter">Following:</div>
        <ul className="list-group list-group-flush listHeightFollowing overflow-y followHiddenscoll">
          {followList.length === 0 ? (
            <div
              className="alert alert-dark mb-0 listCharacter changeAccountSize reduceradius row"
              role="alert"
            >
              <div className="col-sm-2 material-icons">sms_failed</div>
              <div className="col-sm-10">No following User !</div>
            </div>
          ) : (
            followList.map((follow) => {
              return (
                <FollowingUser
                  key={follow.user_id}
                  detail={follow}
                  page={props.page}
                />
              );
            })
          )}
        </ul>
        <div className="card-header p-3 headerCharacter">
          <div className="row">
            <div className="col-sm-10 moveTitle mt-1">
              You may be interested in:
            </div>
            {/* <div className="col-sm-2">
              <button
                className="material-icons refresh refreshChange mt-1"
                name="change"
              >
                refresh
              </button>
            </div> */}
          </div>
        </div>
        <ul className="list-group list-group-flush listHeightFollowing overflow-y followHiddenscoll">
          {unFollowList.length === 0 ? (
            <div
              className="alert alert-warning mb-0 listCharacter changeAccountSize reduceradius row"
              role="alert"
            >
              <div className="col-sm-2 material-icons">
                report_gmailerrorred
              </div>
              <div className="col-sm-10">No more User</div>
            </div>
          ) : (
            unFollowList.map((follow) => {
              return (
                <FollowingUser
                  key={follow.user_id}
                  detail={follow}
                  page={props.page}
                />
              );
            })
          )}
        </ul>
      </div>
      <div className="col-sm-1"></div>
    </div>
  );
};
export default FollowedList;
