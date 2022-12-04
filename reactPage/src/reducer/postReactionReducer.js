//useReducer for post reaction
function postReactionReducer(state, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case "likePost": {
      return {
        like: true,
        likeCount: state.likeCount + 1,
        disLike: false,
        disLikeCount: state.disLikeCount,
      };
    }
    case "cancelLikePost": {
      return {
        like: false,
        likeCount: state.likeCount - 1,
        disLike: false,
        disLikeCount: state.disLikeCount,
      };
    }
    case "disLikePost": {
      return {
        like: false,
        likeCount: state.likeCount,
        disLike: true,
        disLikeCount: state.disLikeCount + 1,
      };
    }
    case "cancelDisLikePost": {
      return {
        like: false,
        likeCount: state.likeCount,
        disLike: false,
        disLikeCount: state.disLikeCount - 1,
      };
    }
    case "turnToLikePost": {
      return {
        like: true,
        likeCount: state.likeCount + 1,
        disLike: false,
        disLikeCount: state.disLikeCount - 1,
      };
    }
    case "turnToDisLikePost": {
      return {
        like: false,
        likeCount: state.likeCount - 1,
        disLike: true,
        disLikeCount: state.disLikeCount + 1,
      };
    }
    case "setStauts": {
      return {
        like: action.like,
        likeCount: action.likeCount,
        disLike: action.disLike,
        disLikeCount: action.disLikeCount,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default postReactionReducer;
