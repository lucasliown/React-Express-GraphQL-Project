import React from "react";
import "../CSS/background.css";
import "../CSS/character.css";
import { useMutation } from "@apollo/client";
import { Block_User } from "../handleData/userBlockData";

//this is the user for block component
function UserDetail(props) {
  const [userBlockStatus] = useMutation(Block_User);

  const handlerBlock = () => {
    userBlockStatus({
      variables: {
        user_id: props.detail.user_id,
        blockStatus: true,
      },
    });
    props.refetchUser();
  };

  const handlerUNBlock = () => {
    userBlockStatus({
      variables: {
        user_id: props.detail.user_id,
        blockStatus: false,
      },
    });
    props.refetchUser();
  };

  return (
    <tr className="tableText">
      <th>{props.detail.username}</th>
      <th>{props.detail.email}</th>
      <th>{props.detail.join_Date}</th>
      <th className="statusWidth">
        {props.detail.blockStatus === false ? (
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={handlerBlock}
          >
            Block
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handlerUNBlock}
          >
            UnBlock
          </button>
        )}
      </th>
    </tr>
  );
}

export default UserDetail;
