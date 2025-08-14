import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUserFromSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/Message.Controller.js";

const messageRouter = express.Router();

messageRouter.get("/users", verifyJWT, getUserFromSidebar);
messageRouter.get("/:id", verifyJWT, getMessages);
messageRouter.get("mark/:id", verifyJWT, markMessageAsSeen);
messageRouter.post("/send/:id", verifyJWT, sendMessage);

export default messageRouter;
