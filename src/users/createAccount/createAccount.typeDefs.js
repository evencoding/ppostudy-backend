import { gql } from "apollo-server-express";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      email: String!
      username: String!
      password: String!
    ): CreateAccountResult!
  }
`;
