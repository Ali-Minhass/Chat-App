import User from "../models/UserModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynHandler.js";
import cloudinary from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "Full name, email, and password are required");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
    bio: bio || "",
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newUser._id
  );

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating a user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, accessToken, refreshToken },
        "User registered successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordValid(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});
//  controller to check user authentication
const checkAuth = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { user: req.user }, "User is authenticated"));
});

// controller to update user profile detail

const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, bio, profilePic } = req.body;
  const userId = req.user._id;

  // Build update object dynamically
  const updateFields = {};
  if (fullName !== undefined) updateFields.fullName = fullName;
  if (bio !== undefined) updateFields.bio = bio;

  if (profilePic) {
    try {
      const upload = await cloudinary.uploader.upload(profilePic, {
        folder: "profile_pics",
        resource_type: "image",
      });
      updateFields.profilePic = upload.secure_url;
    } catch (err) {
      throw new ApiError(500, "Error uploading profile picture");
    }
  }

  const updateUser = await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true,
  }).select("-password -refreshToken");

  if (!updateUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updateUser },
        "User profile updated successfully"
      )
    );
});

export { registerUser, loginUser, checkAuth, updateProfile };
