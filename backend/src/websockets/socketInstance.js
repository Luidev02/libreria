import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });
  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io no ha sido inicializado.");
  }
  return io;
};
