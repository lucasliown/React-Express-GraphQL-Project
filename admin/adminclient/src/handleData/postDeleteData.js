import { gql } from "@apollo/client";

//check dirty word for all post
const AllPostsWithDirtyWordCheck = gql`
  query allPostsWithDirtyWordCheck {
    allPostsWithDirtyWordCheck {
      post_id
      text
      ImageURL
      DirtyWord
      user {
        username
      }
    }
  }
`;

//disable the post
const DisablePostFromDatabase = gql`
  mutation DisablePost($post_id: UUID!, $text: String!) {
    disablePost(post_id: $post_id, text: $text) {
      post_id
      text
      ImageURL
      DirtyWord
      user {
        username
      }
    }
  }
`;

export { AllPostsWithDirtyWordCheck, DisablePostFromDatabase };
