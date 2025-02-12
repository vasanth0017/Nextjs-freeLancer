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
     // Log all incoming events
  // socket.onAny((event, data) => {
  //   console.log(`Event received: ${event}`);
  //   console.log(`Data: ${JSON.stringify(data, null, 2)}`);
  // });
    socket.on("sendMessage", (message) => {
     console.log("Message received:", JSON.stringify(message, null, 2));

      io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log(` Client disconnected: ${socket.id}`);
    });
  });

  res.socket.server.io = io;
  res.end();
}
