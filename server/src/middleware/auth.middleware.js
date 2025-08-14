import asyncHandler from "../utils/asynHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "You are not authenticated");
  }

  let decodedInfo;
  try {
    decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(403, "Invalid or expired token");
  }

  const userId = decodedInfo?.id || decodedInfo?._id;
  if (!userId) {
    throw new ApiError(403, "Invalid token payload");
  }

  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  req.user = user;
  next();
});

export default verifyJWT;
