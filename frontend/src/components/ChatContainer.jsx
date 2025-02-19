import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
    const {
      messages,
      getMessages,
      isMessagesLoading,
      selectedUser,
      subscribeToMessages,
      unsubscribeFromMessages,
    } = useChatStore();
    
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);
  
    useEffect(() => {
      getMessages(selectedUser._id);
  
      subscribeToMessages();
  
      return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages]);
  
    useEffect(() => {
      if (messageEndRef.current && messages) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);
  
    if (isMessagesLoading) {
      return (
        <div className="flex-1 flex flex-col overflow-auto">
          <ChatHeader />
          <MessageSkeleton />
          <MessageInput />
        </div>
      );
    }
  
    return (
      <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
    
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-700">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id 
              ? "flex-row-reverse bg-blue-300 text-black ml-auto"
              : "flex-row bg-gray-800 text-white"
            } rounded-lg p-2 mb-3 max-w-xs sm:max-w-md lg:max-w-lg`}
            ref={messageEndRef}
          >
            {/* Profile Pic & Time Section */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs opacity-50 text-center mt-1">
                <time>{formatMessageTime(message.createdAt)}</time>
              </div>
            </div>
    
            {/* Message Content Section */}
            <div className="flex-1 flex flex-col ml-3">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
    
      <MessageInput />
    </div>
    
    );
  };
export default ChatContainer;