import { Server } from "socket.io";

let io: Server | null = null;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", (userId: string) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {});
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
