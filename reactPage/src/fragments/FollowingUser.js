import React, { useState, useEffect, useContext } from "react";
import "../CSS/post.css";
import "../CSS/loginsignup.css";
import "../CSS/icon.css";
import "../CSS/reply.css";
import "../CSS/followedList.css";
import { Link } from "react-router-dom";
import {
  getFollowStatusFromDatabase,
  followAUserFromDataBase,
  unfollowAUserFromDataBase,
  displayUnFollowUer,
  displayFollowUer,
} from "../handlerdata/followData";
import FollowingListContext from "../context/FollowingListContext";
import UnFollowListContext from "../context/UnFollowListContext";
import { toast } from "react-toastify";

//this is 2 level reply in the post
const FollowingUser = (props) => {
  // eslint-disable-next-line
  const [followStatus, setFollowStatus] = useState(false);
  const { setFollowList } = useContext(FollowingListContext);
  const { setUnfollowList } = useContext(UnFollowListContext);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const data = await getFollowStatusFromDatabase(props.detail.user_id);
      setFollowStatus(data);
    };
    fetchFollowStatus().catch(console.error);
    // eslint-disable-next-line
  }, []);

  //handle follow action
  const handlerFollow = async () => {
    await followAUserFromDataBase(props.detail.user_id);
    setFollowStatus(true);
    const displayFollowList = await displayFollowUer();
    setFollowList(displayFollowList);
    const data = await displayUnFollowUer();
    setUnfollowList(data);
    toast.success(`You are sucessfull follow ${props.detail.username}!`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  //handle unfollow action
  const handlerUnFollow = async () => {
    await unfollowAUserFromDataBase(props.detail.user_id);
    setFollowStatus(false);
    const data = await displayUnFollowUer();
    setUnfollowList(data);
    const displayFollowList = await displayFollowUer();
    setFollowList(displayFollowList);
    toast.warn(`You are unfollow ${props.detail.username}!`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <div className="row p-3 list-group-item makeItFlex listWidth changeBackgroundColor border-bottom-0">
      <Link
        to={`/otherdProfile/${props.detail.user_id}/${props.detail.username}/${props.detail.email}/${props.detail.join_Date}/${props.page}`}
        className="col-sm-2 material-icons followAccountSize changeAccountSize"
      >
        account_circle
      </Link>
      <Link
        to={`/otherdProfile/${props.detail.user_id}/${props.detail.username}/${props.detail.email}/${props.detail.join_Date}/${props.page}`}
        className="col-sm-9  listCharacter changeAccountSize "
      >
        {props.detail.username}
      </Link>
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
  );
};
export default FollowingUser;
