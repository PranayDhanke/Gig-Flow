import { io } from "socket.io-client";

export const socket = io("https://gig-flow-pfch.onrender.com", {
  withCredentials: true,
  autoConnect: false,
});
