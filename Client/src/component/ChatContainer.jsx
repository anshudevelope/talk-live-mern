import { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../chat-app-assets/assets";
import { formateMessageTime } from "../lib/Utils";
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();

  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() })
    setInput("");
  }

  // Handle send image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full min-h-0 flex flex-col backdrop-blur-lg">

      {/* ===== HEADER ===== */}
      <div className="sticky top-0 z-10 flex items-center gap-3 py-3 px-4 border-b border-stone-500 bg-black/40">
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {(onlineUsers || []).includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
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
        {messages?.map((message, index) => {
          const isMe = message?.senderId === authUser._id;

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={selectedUser.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
              )}

              {message?.image ? (
                <div className="flex flex-col">
                  <img
                    src={message.image}
                    alt=""
                    className="max-w-[230px] rounded-lg border border-gray-600"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 text-right">
                    {formateMessageTime(message.createdAt)}
                  </span>
                </div>
              ) : (
                <div className={`px-3 py-2 max-w-[240px] text-sm text-white rounded-lg flex flex-col ${isMe
                  ? "bg-violet-500/40 rounded-br-none"
                  : "bg-gray-700/40 rounded-bl-none"
                  }`}
                >
                  <span>{message?.text}</span>

                  <span className="text-[10px] text-gray-300 mt-1 text-right">
                    {formateMessageTime(message.createdAt)}
                  </span>
                </div>
              )}

              {isMe && (
                <img
                  src={authUser.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* ===== Bottom INPUT ===== */}
      <div className="sticky bottom-0 z-10 p-4 border-t border-stone-500 bg-black/40 flex items-center gap-3">
        <div className="flex-1 flex items-center bg-white/10 px-3 rounded-full">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm p-3 outline-none text-white placeholder-gray-400"
          />
          <input onChange={handleSendImage} type="file" id="image" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
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
