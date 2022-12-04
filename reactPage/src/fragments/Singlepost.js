import React, { useState, useContext, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "../CSS/post.css";
import "../CSS/loginsignup.css";
import "../CSS/icon.css";
import "../CSS/reply.css";
import "../CSS/followedList.css";
import "../CSS/modal.css";
import moment from "moment";
import Replycomponent from "./Replycomponent";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import {
  checkComment,
  addReplyWithPost,
  deletePostInDatabase,
  getDisplayCommentForAPost,
  addPreference,
  preferenceStatus,
} from "../handlerdata/postingdata";
import { toast } from "react-toastify";
import ModalEdit from "./ModalEdit";
import Modalalert from "../Utilities/Modalalert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UserDetailContext from "../context/UserDetailContext";
import postReactionReducer from "../reducer/postReactionReducer";

//this function is for diaply the sigle post in the Posting page and all post page
const Singlepost = (props) => {
  // eslint-disable-next-line
  const [time, setTime] = useState(moment(props.detail.post_time).fromNow());
  const { currentUser } = useContext(UserDetailContext);
  const [open, setOpen] = useState(false);
  const [commentDetail, setcommentDetail] = useState("");
  const [dispalyComment, setdispalyComment] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [messageInmodal, setmessageInmodal] = useState("");
  const [titleInmodal, settitleInmodal] = useState("");
  const [commentCount, setCommentCount] = useState("");
  const [preference, dispatch] = useReducer(postReactionReducer, {
    like: false,
    disLike: false,
    likeCount: 0,
    disLikeCount: 0,
  });

  const handlerSubmitComment = async (event) => {
    event.preventDefault();
    //check the vaildation for each one level comment
    const check = checkComment(commentDetail);
    if (
      check === "Cannot have empty reply message, Please enter your message"
    ) {
      toast.error(
        "Cannot have empty reply message, Please enter your message",
        {
          position: toast.POSITION.TOP_LEFT,
        }
      );
      setcommentDetail("");
      return;
    }
    if (
      check ===
      "Cannot enter more than 100 characters, Please modify your message"
    ) {
      toast.error(
        "Cannot enter more than 100 characters, Please modify your message",
        {
          position: toast.POSITION.TOP_LEFT,
        }
      );
      setcommentDetail("");
      return;
    }
    //add the reply in the database
    await addReplyWithPost(commentDetail, props.detail.post_id);
    const data = await getDisplayCommentForAPost(props.detail.post_id);
    setdispalyComment(data);
    setcommentDetail("");
    toast.success("You created a new Comment!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handlerEdit = () => {
    setShowEdit(true);
  };

  //handle delete the post this call back function
  const handlerDelete = () => {
    setShowRemove(true);
    setmessageInmodal("Do you really want to delete the Post?");
    settitleInmodal("Please read the instruction");
  };

  const handlerDeletePost = () => {
    props.setDetele(props.detail.post_id);
    deletePostInDatabase(props.detail.post_id);
  };

  //fetch comment
  useEffect(() => {
    const fetchComment = async () => {
      const data = await getDisplayCommentForAPost(props.detail.post_id);
      setdispalyComment(data);
    };
    fetchComment();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCommentCount(dispalyComment.length);
    // eslint-disable-next-line
  }, [dispalyComment]);

  //initialize the post react states
  useEffect(() => {
    const fetchPreferenceStatus = async () => {
      const data = await preferenceStatus(
        props.detail.post_id,
        currentUser.user_id
      );
      if (data === null) {
        dispatch({
          type: "setStauts",
          like: false,
          disLike: false,
          likeCount: 0,
          disLikeCount: 0,
        });
        return;
      }
      if (data.preference === true) {
        dispatch({
          type: "setStauts",
          like: true,
          disLike: false,
          likeCount: data.like,
          disLikeCount: data.disLike,
        });
      } else if (data.preference === false) {
        dispatch({
          type: "setStauts",
          like: false,
          disLike: true,
          likeCount: data.like,
          disLikeCount: data.disLike,
        });
      } else if (data.preference === null) {
        dispatch({
          type: "setStauts",
          like: false,
          disLike: false,
          likeCount: data.like,
          disLikeCount: data.disLike,
        });
      }
    };
    fetchPreferenceStatus().catch(console.error);
    // eslint-disable-next-line
  }, []);

  //hander reducer for post reaction
  const handlePreference = async (event) => {
    if (
      preference.like === false &&
      preference.disLike === false &&
      event.target.name === "like"
    ) {
      dispatch({
        type: "likePost",
      });
      return await addPreference(
        props.detail.post_id,
        currentUser.user_id,
        true
      );
    }
    if (
      preference.like === true &&
      preference.disLike === false &&
      event.target.name === "like"
    ) {
      dispatch({
        type: "cancelLikePost",
      });
      return await addPreference(
        props.detail.post_id,
        currentUser.user_id,
        null
      );
    }
    if (
      preference.like === false &&
      preference.disLike === false &&
      event.target.name === "disLike"
    ) {
      dispatch({
        type: "disLikePost",
      });
      return await addPreference(
        props.detail.post_id,
        currentUser.user_id,
        false
      );
    }
    if (
      preference.like === false &&
      preference.disLike === true &&
      event.target.name === "disLike"
    ) {
      dispatch({
        type: "cancelDisLikePost",
      });
      return await addPreference(
        props.detail.post_id,
        currentUser.user_id,
        null
      );
    }
    if (
      preference.like === false &&
      preference.disLike === true &&
      event.target.name === "like"
    ) {
      dispatch({
        type: "turnToLikePost",
      });
      return await addPreference(
        props.detail.post_id,
        currentUser.user_id,
        true
      );
    }
    if (
      preference.like === true &&
      preference.disLike === false &&
      event.target.name === "disLike"
    ) {
      dispatch({
        type: "turnToDisLikePost",
      });
      return await addPreference(
        props.detail.post_id,
        currentUser.user_id,
        false
      );
    }
  };

  return (
    <div className="layoutcon">
      <div className=" shadow p-5 mb-2 submit border border-1 cardborder">
        <div className="row">
          <div className="col-sm-1 moveicon">
            {currentUser.user_id === props.detail.user.user_id ? (
              <Link
                to="/profile"
                className="material-icons postinfo md-36 followAccountSize changeAccountSize"
              >
                account_circle
              </Link>
            ) : (
              <Link
                to={`/otherdProfile/${props.detail.user.user_id}/${props.detail.user.username}/${props.detail.user.email}/${props.detail.user.join_Date}/${props.page}`}
                className="col-sm-2 material-icons followAccountSize changeAccountSize md-36"
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
        <div className="col-sm-8"></div>

        <div className="row mb-5">
          <div className="col-sm-1"></div>

          <div className="col-sm-10 mb-2 movetext">
            <div className=" postlist mb-2">
              <p
                className="text-break"
                dangerouslySetInnerHTML={{ __html: props.detail.text }}
              ></p>
            </div>
            <div className="row">
              <div className="col-sm "></div>
              <div className="col-sm-8 ">
                {props.detail.ImageURL !== "" && (
                  <img
                    src={props.detail.ImageURL}
                    className="rounded picturesize"
                    alt="..."
                  />
                )}
              </div>
              <div className="col-sm "></div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>
        <div className="distance mb-3">
          <div className="row">
            <div className="col-sm-2">
              <Button
                variant="link"
                className="mx-3 moveExtend btn-rm-outline p-0"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                <span className="material-icons camera cameracolor">chat</span>
              </Button>
            </div>
            <div className="col-sm-1  moveCountOfComment">{commentCount}</div>
            {preference.like === false ? (
              <div className="col-sm-1">
                <button
                  className="material-icons camera cameracolor moveLike"
                  onClick={handlePreference}
                  name="like"
                  data-testid="likeOn"
                >
                  thumb_up
                </button>
              </div>
            ) : (
              <div className="col-sm-1">
                <button
                  className="material-icons moveLike clickedPreferenceLike clickedPreferenceLikeColor"
                  onClick={handlePreference}
                  name="like"
                >
                  thumb_up
                </button>
              </div>
            )}
            <div className="col-sm-1 moveCountOfLike">
              {preference.likeCount}
            </div>
            {preference.disLike === false ? (
              <div className="col-sm-1">
                <button
                  className="material-icons camera cameracolor moveLike moveDisLike"
                  onClick={handlePreference}
                  name="disLike"
                >
                  thumb_down
                </button>
              </div>
            ) : (
              <div className="col-sm-1">
                <button
                  className="material-icons moveLike moveDisLike clickedPreferenceDisLike clickedPreferenceDisLikeColor"
                  onClick={handlePreference}
                  name="disLike"
                >
                  thumb_down
                </button>
              </div>
            )}

            <div className="col-sm-1 moveCountOfDisLike">
              {preference.disLikeCount}
            </div>
            <div className="col-sm"></div>
            {currentUser.username === props.detail.user.username && (
              <>
                <div
                  htmlFor="formFile"
                  onClick={handlerEdit}
                  className=" material-icons  deleteBecomeblue form-label cameracolor col-sm-1 mx-4 mt-1"
                >
                  edit
                </div>
                <div
                  htmlFor="formFile"
                  onClick={handlerDelete}
                  className=" material-icons  deleteBecomered form-label cameracolor col-sm-1 mt-1"
                >
                  delete
                </div>
              </>
            )}
          </div>
        </div>

        <Collapse in={open}>
          <div id="example-collapse-text">
            <form
              onSubmit={handlerSubmitComment}
              id="subComment"
              className="row mx-1"
            >
              <div className="form-group col-sm-11 ">
                <ReactQuill
                  onChange={setcommentDetail}
                  value={commentDetail}
                  className="form-control textBoxForPost"
                  form="subComment"
                  placeholder="Comment@..."
                />
              </div>
              <div className="col-sm-1 ">
                <button
                  type="submit"
                  className="btn btn-outline-secondary moveReplay"
                >
                  Reply
                </button>
              </div>
            </form>
            {/* loop all the post i need */}
            {dispalyComment.length !== 0 &&
              dispalyComment.map((comment) => {
                return (
                  <Replycomponent
                    key={comment.comment_id}
                    detail={comment}
                    page={props.page}
                  />
                );
              })}
          </div>
        </Collapse>
      </div>
      {/* this is two modal is over there */}
      <ModalEdit
        show={showEdit}
        setShow={setShowEdit}
        postDetail={props.detail}
        setPostDetail={props.setModify}
      />
      <Modalalert
        show={showRemove}
        setshowModal={setShowRemove}
        settile={titleInmodal}
        settest={messageInmodal}
        dothings={handlerDeletePost}
      />
    </div>
  );
};

export default Singlepost;
