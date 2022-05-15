require("dotenv").config();
import express from "express";
import socketIO from "socket.io";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import cors from "cors";
import socket from "./socket";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

(async () => {
  const apollo = new ApolloServer({ resolvers, typeDefs });
  await apollo.start();
  apollo.applyMiddleware({ app });
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
