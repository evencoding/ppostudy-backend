import { Server, Socket } from "socket.io";
import client from "./client";
import { getUser } from "./users/users.utils";

function socket({ io }) {
  io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.onAny((event) => {
      console.log(`Socket Event:${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
      socket.join(roomName);
      console.log(socket.rooms);
      done();
      socket.to(roomName).emit("welcome", socket.username);
    });
    socket.on("disconnecting", () => {
      console.log(socket.rooms);
      socket.rooms.forEach((room) =>
        socket.to(room).emit("bye", socket.username)
      );
    });
    socket.on("new_message", (msg, room, done) => {
      socket.to(room).emit("new_message", `${socket.username}: ${msg}`);
      done();
    });
    socket.on("username", (username) => (socket["username"] = username));
  });
}

export default socket;
