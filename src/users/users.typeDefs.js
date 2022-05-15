import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    email: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
