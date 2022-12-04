const { gql } = require("apollo-server-express");
const GraphQLUUID = require("graphql-type-uuid");
const { findAllUser, blockOrUnblockUser } = require("./userResolvers");
const {
  findAllPostWithCheck,
  disablePostFromDatabase,
} = require("./postResolvers");
const {
  findTopFollowed,
  findUserPorfileVisitCount,
  findPostReactionLikeCount,
  findPostReactionDislikeCount,
  findallPsersonVisit
} = require("./metricsResolvers");

// Schema.
const typeDefs = gql`
  scalar UUID
  scalar Date
  type User {
    user_id: UUID!
    username: String!
    email: String!
    password_hash: String!
    join_Date: String!
    blockStatus: Boolean!
    posts: [Post]
    following_count: Int!
    following: [User]
  }

  type Post {
    post_id: UUID!
    text: String!
    ImageURL: String!
    user: User
    DirtyWord: Boolean!
    likeCount: Int!
    dislikeCount: Int!
    post_time: Date!
  }

  type follows {
    follow_id: UUID!
    following_id: UUID!
    followed_id: UUID!
  }

  type profilevisit {
    visit_id: UUID!
    visitcount: Int!
    visitDate: Date!
    user_id: UUID!
    user: User
  }

  type reaction {
    reaction_id: UUID!
    prreference: Boolean
    user_id: UUID!
    post_id: UUID!
  }

  type personvisit {
    visit_id: UUID!
    visitcount: Int!
    visitDate: Date!
  }

  type Query {
    allUsers: [User]
    allPostsWithDirtyWordCheck: [Post]
    topFollowed: [User]
    getProfileVisit(user_id: UUID!): [profilevisit]
    getPostReactionLikeCount(user_id: UUID!): [Post]
    getPostReactionDislikeCount(user_id: UUID!): [Post]
    getPersonVisit: [personvisit]
  }

  type Mutation {
    blockUser(user_id: UUID!, blockStatus: Boolean!): User!
    disablePost(post_id: UUID!, text: String!): Post!
  }
`;

// Resolvers.
const resolvers = {
  UUID: GraphQLUUID,
  Query: {
    allUsers: findAllUser,
    allPostsWithDirtyWordCheck: findAllPostWithCheck,
    topFollowed: findTopFollowed,
    getProfileVisit: async (_, { user_id }) => {
      const profileVisit = await findUserPorfileVisitCount(user_id);
      return profileVisit;
    },
    getPostReactionLikeCount: async (_, { user_id }) => {
      const likeCount = await findPostReactionLikeCount(user_id);
      return likeCount;
    },
    getPostReactionDislikeCount: async (_, { user_id }) => {
      const dislikeCount = await findPostReactionDislikeCount(user_id);
      return dislikeCount;
    },
    getPersonVisit:findallPsersonVisit,
  },
  Mutation: {
    blockUser: async (_, { user_id, blockStatus }) => {
      const user = await blockOrUnblockUser(user_id, blockStatus);
      return user;
    },
    disablePost: async (_, { post_id, text }) => {
      const post = await disablePostFromDatabase(post_id, text);
      return post;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
