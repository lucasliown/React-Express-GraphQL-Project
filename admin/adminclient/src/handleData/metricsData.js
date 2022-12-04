import { gql } from "@apollo/client";

//gql for get Top 10 blogger
const Top10FollowedUser = gql`
  query TopFollowed {
    topFollowed {
      username
      following_count
    }
  }
`;

//get all profile visit
const getPorfileVisit = gql`
  query GetProfileVisit($user_id: UUID!) {
    getProfileVisit(user_id: $user_id) {
      visit_id
      visitcount
      visitDate
      user {
        user_id
        username
      }
    }
  }
`;

const getGetDislikeCount = gql`
  query GetPostReactionDislikeCount($user_id: UUID!) {
    getPostReactionDislikeCount(user_id: $user_id) {
      post_id
      dislikeCount
      post_time
    }
  }
`;

const getGetLikeCount = gql`
  query GetPostReactionLikeCount($user_id: UUID!) {
    getPostReactionLikeCount(user_id: $user_id) {
      post_id
      likeCount
      post_time
    }
  }
`;

const GetPersonvisitCount = gql`
  query GetPersonVisit {
    getPersonVisit {
      visit_id
      visitcount
      visitDate
    }
  }
`;

export {
  Top10FollowedUser,
  getPorfileVisit,
  getGetDislikeCount,
  getGetLikeCount,
  GetPersonvisitCount,
};
