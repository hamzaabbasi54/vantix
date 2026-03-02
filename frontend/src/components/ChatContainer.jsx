import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser, getMessagesByUserId, messages, isMessagesLoading,
    subscribeToMessages, unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const isMine = (msg) => msg.senderId === authUser._id;

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-6">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-3">
            {messages.map((msg) => (
              <div key={msg._id} className={`chat ${isMine(msg) ? "chat-end" : "chat-start"}`}>
                {msg.image ? (
                  /* Image message — WhatsApp-style tight layout */
                  <div
                    className="chat-bubble relative max-w-[280px] !p-0 overflow-hidden"
                    style={isMine(msg)
                      ? { background: '#005C4B', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }
                      : { background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)' }
                    }
                  >
                    <img src={msg.image} alt="Shared" className="w-full object-cover" style={{ maxHeight: '300px' }} />
                    {msg.text && (
                      <p className="px-2.5 pt-1.5 pb-0 text-sm" style={{ color: '#E9EDEF' }}>{msg.text}</p>
                    )}
                    <p className="text-[10px] px-2.5 py-1 text-right" style={{ color: '#00A884' }}>
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                ) : (
                  /* Text-only message */
                  <div
                    className="chat-bubble relative max-w-[75%]"
                    style={isMine(msg)
                      ? { background: '#005C4B', color: '#E9EDEF', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }
                      : { background: '#1a1a1a', color: '#E9EDEF', border: '1px solid rgba(255,255,255,0.06)' }
                    }
                  >
                    <p>{msg.text}</p>
                    <p className="text-[10px] mt-1" style={{ color: '#00A884' }}>
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
}
export default ChatContainer;