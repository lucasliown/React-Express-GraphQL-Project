import {
  followAUser,
  unfollowAUser,
  getDisplayfollowList,
  getfollowStatus,
  getDisplayUnfollowList
} from "./followDataService.js";
import { getUserData } from "./personaldata";

//follow a user call API
const followAUserFromDataBase = async (followed_ID) => {
  const user = getUserData();
  const followDetail = {
    followed_id: followed_ID,
    following_id: user.user_id,
  };
  const followPromise = await followAUser(followDetail);
  const followDetailData = followPromise.data;
  return followDetailData;
};

//unfollow a user call API
const unfollowAUserFromDataBase = async (followed_ID) => {
  const user = getUserData();
  const followDetail = {
    followed_id: followed_ID,
    following_id: user.user_id,
  };
  const followPromise = await unfollowAUser(followDetail);
  const followDetailData = followPromise.data;
  return followDetailData;
};

//get all display following user list
const displayFollowUer = async () => {
  const user = getUserData();
  if(user===null){
    return [];
  }
  const followListPormise = await getDisplayfollowList(user.user_id);
  const data = followListPormise.data[0];
  return data.following;
};

//get all display unfollowing user list
const displayUnFollowUer = async () => {
  const user = getUserData();
  if(user===null){
    return [];
  }
  const followListPormise = await getDisplayUnfollowList(user.user_id);
  const data = followListPormise.data;
  return data;
};

//get all display following  status user list
const getFollowStatusFromDatabase = async (followed_ID) => {
  const user = getUserData();
  const followDetail = {
    followed_id: followed_ID,
    following_id: user.user_id,
  };
  const statusPromise = await getfollowStatus(followDetail);
  const status = statusPromise.data;
 
  if (status === false) {
    return false;
  }
  const statusArray = status[0].following;
  // console.log(statusArray);
  for(const followed of statusArray ){
    if(followed.user_id===followed_ID){
        return true;
    }
  }
  return false;
};

export {
  followAUserFromDataBase,
  displayFollowUer,
  getFollowStatusFromDatabase,
  unfollowAUserFromDataBase,
  displayUnFollowUer
};
