import React from "react";
import "../CSS/background.css";
import "../CSS/character.css";
import { useMutation } from "@apollo/client";
import { DisablePostFromDatabase } from "../handleData/postDeleteData";

//this is the post component for delete
function PostDetail(props) {
  const [disablePost] = useMutation(DisablePostFromDatabase);
  const disableText =
    "<p><strong><em>[**** This post has been deleted by the admin ***]</em></strong></p>";

  const handlerDelete = () => {
    disablePost({
      variables: {
        post_id: props.detail.post_id,
        text: disableText,
      },
    });
    props.refetchPost();
  };

  return (
    <tr className="tableText">
      <th>{props.detail.user.username}</th>
      <th
        className="text-break textWidth"
        dangerouslySetInnerHTML={{ __html: props.detail.text }}
      ></th>
      <th>
        {props.detail.ImageURL !== "" && (
          <img
            src={props.detail.ImageURL}
            className="rounded picturesize"
            alt="..."
          />
        )}
      </th>
      <th>
        {props.detail.DirtyWord === true ? (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handlerDelete}
          >
            Delete
          </button>
        ) : (
          <button type="button" className="btn btn-outline-secondary" disabled>
            Delete
          </button>
        )}
      </th>
    </tr>
  );
}

export default PostDetail;
