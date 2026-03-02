import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => { if (event.key === "Escape") setSelectedUser(null); };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center glass-surface max-h-[68px] px-5 py-3.5" style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0 }}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="size-9 rounded-full overflow-hidden" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}>
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="w-full h-full object-cover" />
          </div>
          {isOnline && <span className="absolute bottom-0 right-0 online-dot !size-2" />}
        </div>
        <div>
          <h3 className="font-semibold text-sm" style={{ color: '#E9EDEF' }}>{selectedUser.fullName}</h3>
          <p className="text-xs" style={{ color: isOnline ? '#00A884' : 'rgba(233,237,239,0.25)' }}>{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)} className="size-7 flex items-center justify-center rounded-lg transition-all duration-200" style={{ color: 'rgba(233,237,239,0.3)' }}>
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
export default ChatHeader;