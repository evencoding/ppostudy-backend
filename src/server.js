require("dotenv").config();
import express from "express";
import socketIO from "socket.io";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import cors from "cors";
import socket from "./socket";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

(async () => {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });
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
