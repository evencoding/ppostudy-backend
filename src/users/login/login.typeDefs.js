import { gql } from "apollo-server-express";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    username: String
    error: String
  }
  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;
