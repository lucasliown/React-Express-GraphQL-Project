import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import Singlepost from "../fragments/Singlepost";
import {
  findPost,
  getDisplayPostForAUserForOthers,
} from "../handlerdata/postingdata";
import {
  followAUserFromDataBase,
  displayFollowUer,
  unfollowAUserFromDataBase,
  getFollowStatusFromDatabase,
  displayUnFollowUer,
} from "../handlerdata/followData";
import { addPorfileVisitCount } from "../handlerdata/analysisDataService";
import "../CSS/followedList.css";
import FollowingListContext from "../context/FollowingListContext";
import UnFollowListContext from "../context/UnFollowListContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//for display others porfile component in the page
function OthersProfilecomponent() {
  const runOnce = useRef(true);
  let { user_id, username, email, join_Date, page } = useParams();
  const [displayPost, setpostDisplayDetail] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);
  const { setFollowList } = useContext(FollowingListContext);
  const { setUnfollowList } = useContext(UnFollowListContext);
  const navigate = useNavigate();

  //call back function for modify the post
  const modifyDisplay = (modifyPost) => {
    let temp_state = [...displayPost];
    for (const post of temp_state) {
      if (modifyPost.post_id === post.post_id) {
        post.ImageURL = modifyPost.ImageURL;
        post.text = modifyPost.text;
      }
    }
    setpostDisplayDetail(temp_state);
  };

  //call back function for remove the post
  const removeDisplay = (removePost_id) => {
    let temp_state = [...displayPost];
    const deleteIndex = findPost(removePost_id, temp_state);
    temp_state.splice(deleteIndex, 1);
    setpostDisplayDetail(temp_state);
  };

  //get post for others profile
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getDisplayPostForAUserForOthers(user_id);
      setpostDisplayDetail(data);
    };
    fetchPost();
    // eslint-disable-next-line
  }, []);

  //get follow status for others profile
  useEffect(() => {
    const fetchFollowStatus = async () => {
      const data = await getFollowStatusFromDatabase(user_id);
      setFollowStatus(data);
    };
    fetchFollowStatus();
    // eslint-disable-next-line
  }, []);

  //add visit count for profile
  useEffect(() => {
    const fetchPorfileVisit = async () => {
      if (runOnce.current) {
        runOnce.current = false;
        await addPorfileVisitCount(user_id);
      }
    };
    fetchPorfileVisit();
    // eslint-disable-next-line
  }, []);

  //handle follow action
  const handlerFollow = async () => {
    await followAUserFromDataBase(user_id);
    setFollowStatus(true);
    const displayFollowList = await displayFollowUer();
    setFollowList(displayFollowList);
    const data = await displayUnFollowUer();
    setUnfollowList(data);
    toast.success(`You are sucessfull follow ${username}!`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  //handle unfollow action
  const handlerUnFollow = async () => {
    await unfollowAUserFromDataBase(user_id);
    setFollowStatus(false);
    const data = await displayUnFollowUer();
    setUnfollowList(data);
    const displayFollowList = await displayFollowUer();
    setFollowList(displayFollowList);
    toast.warn(`You are unfollow ${username}!`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  //handler go back
  const handlerGoBack = () => {
    if (page === "profile") {
      navigate("/profile");
    } else if (page === "posting") {
      navigate("/posting");
    } else if (page === "favourite") {
      navigate("/favourite");
    } else if (page === "allpost") {
      navigate("/allpost");
    }
  };

  return (
    <main role="main" className="min-vh-100 backgroundcolour">
      <div className="container containerchar">
        <div className="row mb-3">
          <div className="col-sm-1">
            <button
              className="material-icons unfollow unfollowChange mx-5"
              onClick={handlerGoBack}
            >
              arrow_back_ios
            </button>
          </div>
          <div className="col-sm-2 listCharacter mb-2">
            {username}'s Profile
          </div>
          <hr className="colorHr"></hr>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="row sticky-top">
              <div className="col-sm-2"></div>
              <div className="col-sm-6 mx-auto card card-body border border-1 shadow p-0 submit reduceradius mb-5 listHeight">
                <div className="card-header p-3 headerCharacter">Profile:</div>
                <ul className="list-group list-group-flush listHeightFollowing  followHiddenscoll">
                  <div className="row p-3 list-group-item makeItFlex listWidth  border-bottom-0">
                    <div className="col-sm-2 material-icons followAccountSize changeAccountSize">
                      account_circle
                    </div>
                    <div className="col-sm-9  listCharacter changeAccountSize">
                      {username}
                    </div>
                    <div className="col-sm-1 ">
                      {followStatus === true ? (
                        <button
                          className="material-icons unfollow unfollowChange mt-1"
                          name="change"
                          onClick={handlerUnFollow}
                        >
                          person_remove
                        </button>
                      ) : (
                        <button
                          className="material-icons unfollow unfollowChange mt-1"
                          name="change"
                          onClick={handlerFollow}
                        >
                          person_add
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="row p-3 list-group-item makeItFlex listWidth  border-bottom-0">
                    <div className="col-sm-2 material-icons followAccountSize changeAccountSize">
                      email
                    </div>
                    <div className="col-sm-9  listCharacter changeAccountSize">
                      {email}
                    </div>
                  </div>
                </ul>
                <div className="card-header p-3 headerCharacter">
                  <div className="row">
                    <div className="col-sm-10 moveTitle mt-1">
                      Joined: {join_Date}
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush listHeightFollowing overflow-y followHiddenscoll"></ul>
              </div>
              <div className="col-sm-1"></div>
            </div>
          </div>

          <div className=" col-sm-7 moveAllPost">
            <div className="endedge ">
              {displayPost.length !== 0 ? (
                displayPost.map((post) => {
                  return (
                    <Singlepost
                      key={post.post_id}
                      detail={post}
                      setModify={modifyDisplay}
                      setDetele={removeDisplay}
                    />
                  );
                })
              ) : (
                <div className="d-flex justify-content-center align-items-center mx-5 alertCharacter mt-5 p-5">
                  <div
                    className="alert alert-warning mb-0 listCharacter changeAccountSize p-5"
                    role="alert"
                  >
                    <div className="material-icons mx-5">report_problem</div>
                    <div className="">No posts exist !</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </main>
  );
}

export default OthersProfilecomponent;
