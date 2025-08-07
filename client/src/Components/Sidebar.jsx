import React from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ SelectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-6 rounded-r-2xl overflow-y-auto text-white transition-all duration-300 ${
        SelectedUser ? "" : "max-md:hidden"
      }`}
    >
      {/* Header */}
      <div className="pb-6 border-b border-gray-700 mb-4">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-32" />
          <div className="relative group">
            <img
              src={assets.menu_icon}
              alt="menu"
              title="Options"
              className="h-5 w-5 cursor-pointer transition-transform duration-200 group-hover:rotate-90"
            />
            <div className="absolute right-0 mt-2 w-36 bg-[#2c2640] border border-gray-600 rounded-md shadow-xl text-sm text-gray-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20">
              <p
                onClick={() => navigate("/Profile")}
                className="px-4 py-2 hover:bg-[#3d3754] cursor-pointer"
              >
                Edit Profile
              </p>
              <hr className="border-gray-600" />
              <p className="px-4 py-2 hover:bg-[#3d3754] cursor-pointer">
                Log Out
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="search" className="w-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col">
        {userDummyData.map((user, index) => (
          <div
            key={user._id || index}
            onClick={() => setSelectedUser(user)}
            className={`relative flex items-center gap-3 p-2 rounded cursor-pointer pl-4 max-sm:text-sm ${
              SelectedUser?._id === user._id ? "bg-[#282142]/50" : ""
            }`}
          >
            <img
              src={user.profilePic || assets.avatar_icon}
              alt="User"
              className="w-[35px] h-[35px] rounded-full object-cover"
            />
            <div className="flex flex-col leading-5">
              <p>{user.fullName || "Unknown User"}</p>
              <span
                className={`text-xs ${
                  index < 3 ? "text-green-500" : "text-neutral-400"
                }`}
              >
                {index < 3 ? "Online" : "Offline"}
              </span>
            </div>
            {index > 2 && (
              <span className="absolute top-2 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {index}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
