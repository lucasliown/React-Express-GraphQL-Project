import React from "react";
import "../CSS/background.css";
import "../CSS/character.css";
import { Link } from "react-router-dom";

//this is the single user detail for post component
function UserListForPost(props) {
  return (
    <tr className="tableText">
      <th>{props.detail.username}</th>
      <th>{props.detail.email}</th>
      <th>{props.detail.join_Date}</th>
      <th className="statusWidth">
        <Link
          to={`/reactionmetrics/${props.detail.user_id}/${props.detail.username}`}
          type="button"
          className="btn btn-outline-success"
        >
          View
        </Link>
      </th>
    </tr>
  );
}

export default UserListForPost;
