import React, { useState, useContext, useEffect } from "react";
import "../CSS/loginsignup.css";
import "../CSS/post.css";
import { toast } from "react-toastify";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Singlepost from "../fragments/Singlepost";
import {
  addPost,
  checkPost,
  getDisplayPostForAUser,
  findPost,
} from "../handlerdata/postingdata";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UserDetailContext from "../context/UserDetailContext";
import FollowedList from "../fragments/FollowedList";

//this commponent is for post the posting and display all the post for one person
function Postingcomponent() {
  // eslint-disable-next-line
  const { currentUser, setCurrentUser } = useContext(UserDetailContext);
  const [postDetail, setpostDetail] = useState("");
  const [imageDetail, setimageDetail] = useState(null);
  const [message, setMessage] = useState("");
  const [displayPost, setpostDisplayDetail] = useState([]);
  const page = "posting";

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

  //handler the submit process
  const handlerSubmit = async (event) => {
    event.preventDefault();
    const check = checkPost(postDetail);
    if (check === "Cannot have empty post message, Please enter your message") {
      setpostDetail("");
      setMessage("Cannot have empty post message, Please enter your message!");
      return;
    }
    if (
      check ===
      "Cannot enter more than 600 characters, Please modify your message"
    ) {
      setpostDetail("");
      setMessage(
        "Cannot enter more than 600 characters,Please modify your message!"
      );
      return;
    }
    //check the user is upload the image or not
    if (imageDetail !== null) {
      const name = "images/" + imageDetail.name + uuidv4();
      const imageRef = ref(storage, name);
      const uploadResult = await uploadBytes(imageRef, imageDetail);
      const uploadUrl = await getDownloadURL(uploadResult.ref);
      await addPost(postDetail, uploadUrl);
      const posts = await getDisplayPostForAUser();
      setpostDisplayDetail(posts);
      setMessage("");
      setpostDetail("");
      setimageDetail(null);
      toast.success("You created a new Post!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      await addPost(postDetail, "");
      const posts = await getDisplayPostForAUser();
      setpostDisplayDetail(posts);
      setMessage("");
      setpostDetail("");
      setimageDetail(null);
      toast.success("You created a new Post!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  //handle the image
  const handerImage = (event) => {
    let valueFromHTML = event.target.files[0];
    if (typeof valueFromHTML === "undefined") {
      valueFromHTML = null;
    }
    setimageDetail(valueFromHTML);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getDisplayPostForAUser();
      setpostDisplayDetail(data);
    };
    fetchPost().catch(console.error);
  }, []);

  return (
    <main role="main" className="min-vh-100 backgroundcolour">
      <div className="container containerchar">
        <div className="row mb-3">
          <div className="col-sm-1"></div>
          <div className="col-sm-2 listCharacter mb-2">Create a post</div>
          <hr className="colorHr"></hr>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <FollowedList page={page} />
          </div>
          <div className=" col-sm-7">
            <form
              id="formFile"
              onSubmit={handlerSubmit}
              className=" shadow p-5 marginwithpost submit border border-1 mb-5 "
            >
              <div className="row postinfo md-36 mb-2">
                <div className="material-icons postinfo md-36 col-sm-1 mb-2">
                  account_circle
                </div>
                <div className="col-sm-11 mt-1">
                  <strong>{currentUser.username}</strong>
                </div>
              </div>

              <div className="form-group mb-5">
                <ReactQuill
                  name="postMessage"
                  theme="snow"
                  onChange={setpostDetail}
                  value={postDetail}
                  placeholder="Share you thought..."
                  className="form-control textcontent"
                  form="formFile"
                />
              </div>

              <div className="uploadimg">
                {message !== null && (
                  <div className="row mb-2">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                      <p className="message rounded text-center" role="alert">
                        {message}
                      </p>
                    </div>
                    <div className="col-sm-2"></div>
                  </div>
                )}
                <div className="row">
                  <div className="col-sm-1">
                    <label htmlFor="camera" className="custom-file-upload">
                      <input
                        form="formFile"
                        id="camera"
                        className="form-control uploadfile"
                        type="file"
                        onChange={handerImage}
                      />
                      <div
                        htmlFor="camera"
                        className="material-icons md-36 camera form-label cameracolor"
                      >
                        photo_camera
                      </div>
                    </label>
                  </div>
                  <div className="col-sm-10 mt-1">
                    {imageDetail !== null && (
                      <strong className="titleformat">
                        Upload:{imageDetail.name}
                      </strong>
                    )}
                  </div>
                  <div className="col-sm-1">
                    <button
                      type="submit"
                      className="btn btn-primary postbtn"
                      id="postTest"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div>
              {displayPost.length !== 0 && (
                <div className="titlecolor card p-2 mb-1 reduceradius border-bottom-0  border border-1">
                  <div className="row  col-sm-12 mx-1 posttitle p-1 ">
                    <div className="mt-3 mx-1 posttitle">
                      <p>My Post:</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="endedge">
              {displayPost.length !== 0 ? (
                displayPost.map((post) => {
                  return (
                    <Singlepost
                      key={post.post_id}
                      detail={post}
                      setModify={modifyDisplay}
                      setDetele={removeDisplay}
                      page={page}
                    />
                  );
                })
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </main>
  );
}

export default Postingcomponent;
