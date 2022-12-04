import axiosConfig from "./axiosconfig";

//follow a user
const followAUser = async (followDetail) => {
  return await axiosConfig.post("/api/follow/followAUser", followDetail);
};

//unfollow a user
const unfollowAUser = async (followDetail) => {
  return await axiosConfig.delete(
    `/api/follow/unfollowAUser/${followDetail.followed_id}/${followDetail.following_id}`
  );
};

//get display all the following user list
const getDisplayfollowList = async (following_id) => {
  return await axiosConfig.get(`/api/follow/followingList/${following_id}`);
};

//get all the unfollow user list
const getDisplayUnfollowList = async (following_id) => {
  return await axiosConfig.get(`/api/follow/unfollowingList/${following_id}`);
};

//get follow status for follow button
const getfollowStatus = async (followDetail) => {
  return await axiosConfig.get(
    `/api/follow/followStatus/${followDetail.followed_id}/${followDetail.following_id}`
  );
};

export {
  followAUser,
  unfollowAUser,
  getDisplayfollowList,
  getfollowStatus,
  getDisplayUnfollowList,
};
