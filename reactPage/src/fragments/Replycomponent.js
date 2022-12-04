import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../CSS/post.css";
import "../CSS/loginsignup.css";
import "../CSS/icon.css";
import "../CSS/reply.css";
import "../CSS/followedList.css";
import moment from "moment";
import ReplyFromReplycomponent from "./ReplyFromReplycomponent";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import {
  checkComment,
  addReplyFromReply,
  getDisplayReplyForAComment,
} from "../handlerdata/postingdata";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UserDetailContext from "../context/UserDetailContext";

//this is one level reply
const Replycomponent = (props) => {
  // eslint-disable-next-line
  const [time, setTime] = useState(moment(props.detail.comment_time).fromNow());
  const { currentUser } = useContext(UserDetailContext);
  const [open, setOpen] = useState(false);
  const [replyDetail, setreplyDetail] = useState("");
  const [dispalyReply, setdispalyReply] = useState([]);
  const [replyCount, setReplyCountCount] = useState("");

  //handler the reply for one level
  const handlerSubmitReply = async (event) => {
    event.preventDefault();
    const check = checkComment(replyDetail);
    if (
      check === "Cannot have empty reply message, Please enter your message"
    ) {
      toast.error(
        "Cannot have empty reply message, Please enter your message",
        {
          position: toast.POSITION.TOP_LEFT,
        }
      );
      setreplyDetail("");
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
      setreplyDetail("");
      return;
    }
    //add 2 level reply in the one level reply
    await addReplyFromReply(replyDetail, props.detail.comment_id);
    const data = await getDisplayReplyForAComment(props.detail.comment_id);
    setdispalyReply(data);
    setreplyDetail("");
    toast.success("You created a new Reply!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  useEffect(() => {
    const fetchReply = async () => {
      const data = await getDisplayReplyForAComment(props.detail.comment_id);
      setdispalyReply(data);
    };
    fetchReply().catch(console.error);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setReplyCountCount(dispalyReply.length);
    // eslint-disable-next-line
  }, [dispalyReply]);

  return (
    <div className="moveIcon mt-3">
      <div className="row">
        <div className="col-sm-1"></div>
        <div className="col-sm-1">
          {currentUser.user_id === props.detail.user.user_id ? (
            <Link
              to="/profile"
              className="col-sm-2 material-icons postinfo followAccountSize followAccountSizeChange changeAccountSize"
            >
              account_circle
            </Link>
          ) : (
            <Link
              to={`/otherdProfile/${props.detail.user.user_id}/${props.detail.user.username}/${props.detail.user.email}/${props.detail.user.join_Date}/${props.page}`}
              className="col-sm-2 material-icons postinfo followAccountSize followAccountSizeChange changeAccountSize"
            >
              account_circle
            </Link>
          )}
        </div>
        <div className="col-sm-3 titleformat">
          {currentUser.user_id === props.detail.user.user_id ? (
             <Link to="/profile" className="changeLink">{props.detail.user.username}</Link>
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
        <div className="col-sm-2"></div>
        <div className="col-sm-7 mt-3">
          <p
            className="text-break"
            dangerouslySetInnerHTML={{ __html: props.detail.text }}
          ></p>
        </div>
        <div className="col-sm-2 mt-3 mb-1">
          <Button
            variant="link"
            className="mx-5 btn-rm-outline"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <span className="material-icons camera cameracolor mx-4">chat</span>
          </Button>
        </div>
        <div className="col-sm  mx-2  moveCountOfReply">{replyCount}</div>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <form
              onSubmit={handlerSubmitReply}
              id="subComment"
              className="row replymove mb-5 "
            >
              <div className="col-sm-1"></div>
              <div className="form-group col-sm-10 ">
                <ReactQuill
                  onChange={setreplyDetail}
                  value={replyDetail}
                  className="form-control textBoxForComment"
                  form="subComment"
                  placeholder="Reply@..."
                />
              </div>
              <div className="col-sm-1 ">
                <button
                  type="submit"
                  className="btn btn-outline-secondary moveCommentReplay"
                >
                  Reply
                </button>
              </div>
            </form>

            {dispalyReply.length !== 0 &&
              dispalyReply.map((reply) => {
                return (
                  <ReplyFromReplycomponent
                    key={reply.reply_id}
                    detail={reply}
                    page={props.page}
                  />
                );
              })}
          </div>
        </Collapse>
      </div>
    </div>
  );
};
export default Replycomponent;
