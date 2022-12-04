import axiosConfig from "./axiosconfig";

//get all post
const getAllPost = async () => {
  return await axiosConfig.get("/api/post/");
};
//get post for a user
const getAllPostForAUser = async (user_id) => {
  return await axiosConfig.get(`/api/post/getAllPost/${user_id}`);
};

//create a post in database
const createAPost = async (postDetail) => {
  return await axiosConfig.post("/api/post/create", postDetail);
};

//edit a post in database
const editAPostForAUser = async (post_id,postDetail) => {
  return await axiosConfig.put(`/api/post/update/${post_id}`, postDetail);
};

//get comment for a post
const getAllCommentForAUser = async (commentDetail) => {
  return await axiosConfig.get("/api/comment/getAllComment", {
    params: {
      post_id: commentDetail.post_id,
      user_id: commentDetail.user_id,
    },
  });
};

//create a comment in post
const createAComment = async (postDetail) => {
  return await axiosConfig.post("/api/comment/create", postDetail);
};

//get all reply in comment
const getAllReplyForAUser = async (replyDetail) => {
  return await axiosConfig.get("/api/reply/getAllReply", {
    params: {
      comment_id: replyDetail.comment_id,
      user_id: replyDetail.user_id,
    },
  });
};

//create a reply in comment
const createAReply = async (replyDetail) => {
  return await axiosConfig.post("/api/reply/create", replyDetail);
};

//delte a post 
const deleteAPost=async (post_id)=>{
  return await axiosConfig.delete(`/api/post/delete/${post_id}`);
}

//get the number of reaction count
const getCountReactionForAPost=async(postID)=>{
  return await axiosConfig.get("/api/reaction/getReactionForAPost",{
    params: {
      post_id:postID,
    }
    });
}

//get reaction Status
const getReactionStatusForAPost=async(reactionDetail)=>{
  return await axiosConfig.get("/api/reaction/preferenceStatus", {
    params: {
      post_id:reactionDetail.post_id,
      user_id: reactionDetail.user_id,
    },
  });
}

//give reaction Status
const givePreferneceForAPost=async(reactionDetail)=>{
  return await axiosConfig.post("/api/reaction/providePreference",reactionDetail);
}


export {
  getAllPost,
  getAllPostForAUser,
  createAPost,
  createAComment,
  getAllCommentForAUser,
  getAllReplyForAUser,
  createAReply,
  editAPostForAUser,
  deleteAPost,
  getCountReactionForAPost,
  getReactionStatusForAPost,
  givePreferneceForAPost
};
