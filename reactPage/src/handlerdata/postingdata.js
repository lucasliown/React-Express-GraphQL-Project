import { getUserData } from "./personaldata";
import {
  createAPost,
  getAllPostForAUser,
  createAComment,
  getAllCommentForAUser,
  createAReply,
  getAllReplyForAUser,
  editAPostForAUser,
  deleteAPost,
  givePreferneceForAPost,
  getCountReactionForAPost,
  getReactionStatusForAPost,
} from "./postDataService";

//check the vaildation for add a post
const checkPost = (text) => {
  //referenec from sk
  if (text.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
    return "Cannot have empty post message, Please enter your message";
  }
  if (text.replace(/<(.|\n)*?>/g, "").trim().length > 600) {
    return "Cannot enter more than 600 characters, Please modify your message";
  }
  return true;
};

//check the vaildation for one level comment
const checkComment = (text) => {
  if (text.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
    return "Cannot have empty reply message, Please enter your message";
  }
  if (text.replace(/<(.|\n)*?>/g, "").trim().length > 100) {
    return "Cannot enter more than 100 characters, Please modify your message";
  }
  return true;
};

//add the sigle post in the database
const addPost = async (textFromWeb, ImageurlFromWeb) => {
  const user = getUserData();
  const newPost = {
    text: textFromWeb,
    ImageURL: ImageurlFromWeb,
    user_id: user.user_id,
  };
  const post = await createAPost(newPost);
  return post;
};

//add a one level reply into the post
const addReplyWithPost = async (textFromWeb, postID) => {
  const user = getUserData();
  const postdetail = {
    text: textFromWeb,
    post_id: postID,
    user_id: user.user_id,
  };
  await createAComment(postdetail);
};

//add the 2 level reply in the post
const addReplyFromReply = async (textFromWeb, commentIDFromWeb) => {
  const user = getUserData();
  const repleyDetail = {
    text: textFromWeb,
    comment_id: commentIDFromWeb,
    user_id: user.user_id,
  };
  await createAReply(repleyDetail);
};

//grap the post data i need from the database
const getDisplayPostForAUser = async () => {
  const user = getUserData();
  const postsForAUser = await getAllPostForAUser(user.user_id);
  const postsArray = postsForAUser.data;
  return postsArray;
};

const getDisplayPostForAUserForOthers = async (user_id) => {
  const postsForAUser = await getAllPostForAUser(user_id);
  const postsArray = postsForAUser.data;
  return postsArray;
};

//grap the all comment data i need from the database
const getDisplayCommentForAPost = async (postID) => {
  const user = getUserData();
  const CommentDetail = {
    user_id: user.user_id,
    post_id: postID,
  };
  const commentsPromise = await getAllCommentForAUser(CommentDetail);
  const comments = commentsPromise.data;
  return comments;
};

//find the all 2 level reply for a post for display
const getDisplayReplyForAComment = async (commentID) => {
  const user = getUserData();
  const replyDetail = {
    user_id: user.user_id,
    comment_id: commentID,
  };
  const repliesPromise = await getAllReplyForAUser(replyDetail);
  const replies = repliesPromise.data;
  return replies;
};

//edit the post in the local storge
const editpost = async (postID, textFromWeb, ImageUrlFromWeb) => {
  const modifyPost = {
    text: textFromWeb,
    ImageURL: ImageUrlFromWeb,
  };
  const postPromise = await editAPostForAUser(postID, modifyPost);
  const post = postPromise.data;
  return post;
};

async function deletePostInDatabase(postid) {
  await deleteAPost(postid);
}

function findPost(post_id, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].post_id === post_id) return i;
  }
  return -1;
}

//add preference to the post
const addPreference = async (post_ID, user_ID, preferenceValue) => {
  const reactionDetail = {
    post_id: post_ID,
    user_id: user_ID,
    preference: preferenceValue,
  };
  await givePreferneceForAPost(reactionDetail);
};

//find the status of preference
const preferenceStatus = async (post_ID, user_ID) => {
  const reactionDetail = {
    post_id: post_ID,
    user_id: user_ID,
  };
  const statusPromise = await getReactionStatusForAPost(reactionDetail);
  const countPromise = await getCountReactionForAPost(post_ID);
  const count = countPromise.data;
  const status = statusPromise.data;
  const preference = {
    preference: null,
    disLike: count.dislike,
    like: count.like,
  };
  if(status!==null){
    preference.preference = status.preference
  }
  return preference;
};

export {
  checkPost,
  checkComment,
  getDisplayPostForAUser,
  getDisplayCommentForAPost,
  getDisplayReplyForAComment,
  addPost,
  addReplyWithPost,
  addReplyFromReply,
  editpost,
  deletePostInDatabase,
  findPost,
  addPreference,
  preferenceStatus,
  getDisplayPostForAUserForOthers
};
