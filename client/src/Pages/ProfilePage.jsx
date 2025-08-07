import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("Ali Minhass");
  const [bio, setBio] = useState("Hi! everyone I am using Quick Chat");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can now handle the form submission (e.g., send data to backend)
    console.log({
      name,
      bio,
      image: selectedImage,
    });

    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('/your-background.jpg')] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/10 text-gray-300 border border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg shadow-lg overflow-hidden">
        {/* Left: Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1 w-full"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Profile Details
          </h3>

          {/* Upload Image */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-4 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpeg, .jpg"
              hidden
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border border-white/30"
            />
            <span className="text-sm text-white/80 hover:text-white">
              Upload Profile Image
            </span>
          </label>

          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="p-3 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          {/* Bio Input */}
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write your bio..."
            className="p-3 rounded bg-white/20 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          ></textarea>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-400 to-violet-600 hover:from-purple-500 hover:to-violet-700 text-white py-2 px-6 rounded-full font-medium shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Right: Preview Image */}
        <div className="h-full w-full max-w-xs hidden sm:flex items-center justify-center bg-white/5 p-6">
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : assets.avatar_icon
            }
            alt="preview"
            className="w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
