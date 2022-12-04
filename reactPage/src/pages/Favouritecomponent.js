import React, { useState, useEffect, useContext } from "react";
import "../CSS/loginsignup.css";
import "../CSS/post.css";
import Singlepost from "../fragments/Singlepost";
import { findPost } from "../handlerdata/postingdata";
import FollowedList from "../fragments/FollowedList";
import FollowingListContext from "../context/FollowingListContext";
import { getDisplayPostForAUserForOthers } from "../handlerdata/postingdata";

//for display the favourite post component in the page
function Favouritecomponent() {
  const [displayPost, setpostDisplayDetail] = useState([]);
  const { followList } = useContext(FollowingListContext);
  const page = "favourite";

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

  //display all post that user like
  useEffect(() => {
    const fetchPost = async () => {
      let displayAllFavouritePost = [];
      if (followList.length !== 0) {
        for (const followedUser of followList) {
          const data = await getDisplayPostForAUserForOthers(
            followedUser.user_id
          );
          displayAllFavouritePost = displayAllFavouritePost.concat(data);
        }
      }
      setpostDisplayDetail(displayAllFavouritePost);
    };
    fetchPost().catch(console.error);
    // eslint-disable-next-line
  }, [followList.length]);

  return (
    <main role="main" className="min-vh-100 backgroundcolour">
      <div className="container containerchar">
        <div className="row mb-3">
          <div className="col-sm-1"></div>
          <div className="col-sm-2 listCharacter mb-2">Favourite</div>
          <hr className="colorHr"></hr>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <FollowedList page={page} />
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
                      page={page}
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

export default Favouritecomponent;
