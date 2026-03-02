import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatFound from "./NoChatFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers, unreadCounts, fetchUnreadCounts } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
    fetchUnreadCounts();
  }, [getMyChatPartners, fetchUnreadCounts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatFound />;

  return (
    <>
      {chats.map((chat) => {
        const unread = unreadCounts[chat._id] || 0;
        return (
          <div key={chat._id} className="glass-card p-3 cursor-pointer" onClick={() => setSelectedUser(chat)}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="size-10 rounded-full overflow-hidden" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}>
                  <img src={chat.profilePicture || "/avatar.png"} alt={chat.fullName} className="w-full h-full object-cover" />
                </div>
                {onlineUsers.includes(chat._id) && <span className="absolute bottom-0 right-0 online-dot" />}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm truncate" style={{ color: '#E9EDEF' }}>{chat.fullName}</h4>
                <p className="text-xs" style={{ color: onlineUsers.includes(chat._id) ? '#00A884' : 'rgba(233,237,239,0.25)' }}>
                  {onlineUsers.includes(chat._id) ? "Online" : "Offline"}
                </p>
              </div>
              {/* Unread badge */}
              {unread > 0 && (
                <div className="min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: '#00A884' }}>
                  {unread > 5 ? "5+" : unread}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ChatsList;