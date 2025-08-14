import express from "express";
import "dotenv/config.js";
import cors from "cors";
import http from "http";
import connectDB from "./src/DB/Db.js";
import userRouter from "./src/routes/userRoute.js";
import messageRouter from "./src/routes/messageRoute.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Initialize socket.io server
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// store online user
export const userSocketMap = {};
// scoket.io connection Handler

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("userConnected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit the updated online users list to everyone
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// --------------------------------------//
app.use("/api/status", (req, res) => {
  res.send("server is running");
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
(async () => {
  try {
    await connectDB();
    server.listen(process.env.PORT || 3000, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });

    server.on("error", (err) => {
      console.error(`❌ Server error: ${err.message}`);
      process.exit(1);
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB...");
    process.exit(1);
  }
})();
