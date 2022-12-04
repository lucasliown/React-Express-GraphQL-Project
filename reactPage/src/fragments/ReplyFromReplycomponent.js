import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../CSS/post.css";
import "../CSS/loginsignup.css";
import "../CSS/icon.css";
import "../CSS/reply.css";
import moment from "moment";
import UserDetailContext from "../context/UserDetailContext";
import "../CSS/followedList.css";

//this is 2 level reply in the post
const ReplyFromReplycomponent = (props) => {
  const [time] = useState(moment(props.detail.reply_time).fromNow());
  const { currentUser } = useContext(UserDetailContext);

  return (
    <div className="">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-1 ">
          {currentUser.user_id === props.detail.user.user_id ? (
            <Link
              to="/profile"
              className="material-icons postinfo followAccountSize followAccountSizeChange changeAccountSize"
            >
              account_circle
            </Link>
          ) : (
            <Link
              to={`/otherdProfile/${props.detail.user.user_id}/${props.detail.user.username}/${props.detail.user.email}/${props.detail.user.join_Date}/${props.page}`}
              className="col-sm-2 material-icons followAccountSize followAccountSizeChange changeAccountSize"
            >
              account_circle
            </Link>
          )}
        </div>

        <div className="col-sm-3 titleformat">
          {currentUser.user_id === props.detail.user.user_id ? (
            <Link to="/profile" className="changeLink">
              {props.detail.user.username}
            </Link>
          ) : (
            <Link
              to={`/otherdProfile/${props.detail.user.user_id}/${props.detail.user.username}/${props.detail.user.email}/${props.detail.user.join_Date}/${props.page}`}
              className="changeLink"
            >
              {props.detail.user.username}
            </Link>
          )}
          <div className="titleformat">{time}</div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-7">
          <p
            className="text-break"
            dangerouslySetInnerHTML={{ __html: props.detail.text }}
          ></p>
        </div>
      </div>
    </div>
  );
};
export default ReplyFromReplycomponent;
