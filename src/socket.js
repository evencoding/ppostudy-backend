import { Server, Socket } from "socket.io";

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
    });

    socket.on("sendMessage", (message) => {
      socket.emit("responseMessage", message);
    });
  });
}

export default socket;
