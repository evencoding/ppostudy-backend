import { Server, Socket } from "socket.io";
import client from "./client";
import { getUser } from "./users/users.utils";

function socket({ io }) {
  io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    const req = socket.request.headers;
    console.log(req);
    socket.onAny((event) => {
      console.log(`Socket Event:${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
      socket.join(roomName);
      console.log(socket.rooms);
      done();
      socket.to(roomName).emit("welcome");
    });
    socket.on("disconnecting", () => {
      console.log(socket.rooms);
      socket.rooms.forEach((room) => socket.to(room).emit("bye"));
    });
    socket.on("new_message", (msg, room, done) => {
      socket.to(room).emit("new_message", msg);
      done();
    });
  });
}

export default socket;
