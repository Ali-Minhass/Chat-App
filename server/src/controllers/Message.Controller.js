import User from "../models/UserModel.js";
import Message from "../models/MessageModel.js";
import asyncHandler from "../utils/asynHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cloudinary from "../utils/cloudinary.js";
import { io, userSocketMap } from "../../server.js";
const getUserFromSidebar = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch all users except current user
  const filteredUsers = await User.find({ _id: { $ne: userId } })
    .select("-password -refreshToken")
    .lean();

  // Count unseen messages for each user
  const unseenMessages = {};
  await Promise.all(
    filteredUsers.map(async (user) => {
      const count = await Message.countDocuments({
        senderId: user._id,
        receiverId: userId,
        isSeen: false,
      });
      if (count > 0) {
        unseenMessages[user._id] = count;
      }
    })
  );

  res.status(200).json(
    new ApiResponse(200, {
      unseenMessages,
      users: filteredUsers,
    })
  );
});

// get all message from selected user
const getMessages = asyncHandler(async (req, res) => {
  const { id: selectedUserId } = req.params;
  const userId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: userId, receiverId: selectedUserId },
      { senderId: selectedUserId, receiverId: userId },
    ],
  }).sort({ createdAt: 1 });
  await Message.updateMany(
    { senderId: selectedUserId, receiverId: userId },
    { isSeen: true }
  );
  res.status(200).json(new ApiResponse(200, messages));
});

// mark message as seen using message id

const markMessageAsSeen = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Message.findByIdAndUpdate(id, { isSeen: true });
  res
    .status(200)
    .json(new ApiResponse(200, { message: "Message marked as seen" }));
});
// send Message to selected user

const sendMessage = asyncHandler(async (req, res) => {
  const { text, image } = req.body;
  const senderId = req.user._id;
  const receiverId = req.params.id;

  let imageUrl;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }
  if (!text && !image) {
    return res
      .status(400)
      .json(new ApiResponse(400, { message: "Message content is required" }));
  }
  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });
  // emit the new message to the reciever's socket
  const recieverSocketId = userSocketMap[receiverId];
  if (recieverSocketId) {
    io.to(recieverSocketId).emit("newMessage", newMessage);
  }
  res.status(201).json(new ApiResponse(201, newMessage));
});

export { getUserFromSidebar, getMessages, markMessageAsSeen, sendMessage };
