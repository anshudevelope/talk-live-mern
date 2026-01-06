import { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../chat-app-assets/assets";
import { formateMessageTime } from "../lib/Utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {

  const scrollEnd = useRef();

  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return selectedUser ? (
    <div className="h-full min-h-0 flex flex-col backdrop-blur-lg">

      {/* ===== HEADER ===== */}
      <div className="sticky top-0 z-10 flex items-center gap-3 py-3 px-4 border-b border-stone-500 bg-black/40">
        <img src={selectedUser?.profilePic ||assets.profile_martin} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden w-5" />
      </div>

      {/* ===== MESSAGES (SCROLLABLE) ===== */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide bg-white/5">
        {messagesDummyData.map((message, index) => {
          const isMe = message.senderId === "680f50e4f10f3cd28382ecf9";

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={assets.profile_martin}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
              )}

              {message.image ? (
                <img
                  src={message.image}
                  alt=""
                  className="max-w-[230px] rounded-lg border border-gray-600"
                />
              ) : (
                <div
                  className={`px-3 py-2 max-w-[240px] text-sm text-white rounded-lg ${
                    isMe
                      ? "bg-violet-500/40 rounded-br-none"
                      : "bg-gray-700/40 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {isMe && (
                <img
                  src={assets.avatar_icon}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* ===== INPUT ===== */}
      <div className="sticky bottom-0 z-10 p-4 border-t border-stone-500 bg-black/40 flex items-center gap-3">
        <div className="flex-1 flex items-center bg-white/10 px-3 rounded-full">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm p-3 outline-none text-white placeholder-gray-400"
          />
          <input type="file" id="image" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img
          src={assets.send_button}
          alt=""
          className="w-7 cursor-pointer"
        />
      </div>

    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 h-full">
      <img src={assets.talk_live_logo} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">
        Chat anytime, anywhere
      </p>
    </div>
  );
};

export default ChatContainer;
