import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";

export default function SocketHandler(req: any, res: any) {
  if (res.socket.server.io) {
    console.log("Socket.IO server already running.");
    res.end();
    return;
  }

  console.log("Starting new Socket.IO server...");
  const io = new Server(res.socket.server, {
    path: "/socket.io",
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(` Client connected: ${socket.id}`);

    socket.on("sendMessage", (message) => {
      console.log(`Message received: ${message}`);
      io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log(` Client disconnected: ${socket.id}`);
    });
  });

  res.socket.server.io = io;
  res.end();
}
