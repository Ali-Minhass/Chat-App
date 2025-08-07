import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";

const ChatContainer = ({ SelectedUser, setSelectedUser, currentUserId }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const filteredMessages = messagesDummyData.filter(
    (msg) =>
      (msg.senderId === currentUserId && msg.receiverId === SelectedUser._id) ||
      (msg.receiverId === currentUserId && msg.senderId === SelectedUser._id)
  );

  return SelectedUser ? (
    <div className="h-full overflow-hidden relative backdrop-blur-md flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 py-4 px-5 border-b border-stone-600 bg-white/10">
        <img
          src={SelectedUser.profilePic}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="flex-1 text-lg text-white font-medium flex items-center gap-2">
          {SelectedUser.fullName}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="arrow icon"
          className="md:hidden w-6 cursor-pointer"
        />
        <img
          src={assets.help_icon}
          alt="help icon"
          className="max-md:hidden w-5 cursor-pointer"
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-[72px]">
        {filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/60 text-base italic bg-white/10 px-4 py-2 rounded-xl shadow-sm">
              No Conversation Yet – Let&apos;s Chat 💬
            </p>
          </div>
        ) : (
          filteredMessages.map((message, index) => {
            const isSender = message.senderId === currentUserId;

            return (
              <div
                key={index}
                className={`flex items-end gap-3 ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                {!isSender && (
                  <div className="flex flex-col items-center text-xs text-gray-400">
                    <img
                      src={SelectedUser?.profilePic || assets.profile_martin}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p>{new Date(message.createdAt).toLocaleTimeString()}</p>
                  </div>
                )}

                <div
                  className={`max-w-[60%] text-sm font-light rounded-xl break-words p-3 shadow-sm ${
                    isSender
                      ? "bg-violet-600/50 text-white rounded-br-none"
                      : "bg-zinc-800 text-white rounded-bl-none"
                  }`}
                >
                  {message.image ? (
                    <img
                      src={message.image}
                      alt="message"
                      className="w-full rounded-lg border border-gray-600"
                    />
                  ) : (
                    <p>{message.text}</p>
                  )}
                </div>

                {isSender && (
                  <div className="flex flex-col items-center text-xs text-gray-400">
                    <img
                      src={assets.avatar_icon}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p>{new Date(message.createdAt).toLocaleTimeString()}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input Section */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-black/20 backdrop-blur-md p-4 border-t border-stone-700">
        <div className="flex items-center gap-2 bg-white/10 border border-gray-600 rounded-full px-4 py-2 w-full">
          <input
            type="text"
            placeholder="Type your message..."
            className="bg-transparent text-white outline-none flex-1 placeholder:text-gray-400"
          />
          <input type="file" id="image" accept="image/png, image/jpeg" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="gallery"
              className="w-5 cursor-pointer opacity-80 hover:opacity-100"
            />
          </label>
        </div>
        <img
          src={assets.send_button}
          alt="Send"
          className="w-8 cursor-pointer hover:scale-105 transition"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-400 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="logo" className="w-16" />
      <p className="text-lg font-semibold text-white">Chat Anytime Anywhere</p>
    </div>
  );
};

export default ChatContainer;
