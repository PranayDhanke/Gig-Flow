import app from "./app";
import http from "http";
import { connectToDatabase } from "./db/db";
import { initSocket } from "./socket/socket";

const startServer = async () => {
  const server = http.createServer(app);
  try {
    await connectToDatabase();
    initSocket(server);

    app.get("/", (_req, res) => {
      res.send("Server is Running ");
    });

    server.listen(5000, () => {
      console.log("server running on port 5000");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
