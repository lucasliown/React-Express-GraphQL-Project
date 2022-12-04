import { gql } from "@apollo/client";
//the gql for get all User
const GetAllUser = gql`
  query getAllUsers {
    allUsers {
      user_id
      username
      email
      password_hash
      join_Date
      blockStatus
    }
  }
`;

//gql for block user
const Block_User = gql`
  mutation BlockUser($user_id: UUID!, $blockStatus: Boolean!) {
    blockUser(user_id: $user_id, blockStatus: $blockStatus) {
      user_id
      username
      email
      password_hash
      join_Date
      blockStatus
    }
  }
`;

export { GetAllUser, Block_User };
