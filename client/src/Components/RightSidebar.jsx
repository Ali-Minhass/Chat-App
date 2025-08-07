import React from "react";
import assets, { imagesDummyData } from "../assets/assets";

const RightSidebar = ({ SelectedUser }) => {
  if (!SelectedUser) return null;

  return (
    <div
      className={`w-full h-full relative overflow-y-scroll text-white bg-[#8185b2]/10 max-md:hidden`}
    >
      <div className="h-full w-full p-6 bg-white/5 text-white rounded-l-2xl shadow-inner flex flex-col items-center gap-4">
        {/* Profile Picture */}
        <img
          src={SelectedUser.profilePic || assets.avatar_icon}
          alt="profile pic"
          className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-md"
        />

        {/* Name & Status */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
          <h1 className="text-xl font-semibold">{SelectedUser.fullName}</h1>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-300 text-center px-4">
          {SelectedUser.bio || "This user has no bio yet."}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-gray-600/40 my-4" />

        {/* Media Section */}
        <div className="w-full text-sm text-white/80 px-4">
          <p className="text-base font-medium text-white mb-2">Media</p>
          <div className="max-h-[200px] overflow-y-auto custom-scroll grid grid-cols-2 gap-3 pr-2">
            {imagesDummyData.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url, "_blank")}
                className="cursor-pointer rounded overflow-hidden hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={url}
                  alt="media"
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Log Out Button */}
        <button
          className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-400 to-violet-600 
             hover:from-purple-500 hover:to-violet-700 
             transition-all duration-300 ease-in-out 
             rounded-full text-sm font-medium text-white shadow-md 
             hover:shadow-lg active:scale-95 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
