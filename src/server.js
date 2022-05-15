require("dotenv").config();
import express from "express";
import socketIO from "socket.io";
import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
import socket from "./socket";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

const typeDefs = gql`
  type Query {
    foo: String
  }
`;
const resolvers = {
  Query: {
    foo: () => console.log("Hello World"),
  },
};

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
})();

const httpServer = app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}
  `);

  socket({ io });
});

const io = socketIO(httpServer, {
  cors: {
    origin: process.env.CORSORIGIN,
    credentials: true,
  },
});
