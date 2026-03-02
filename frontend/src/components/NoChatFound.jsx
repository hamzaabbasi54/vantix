import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="size-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(0,168,132,0.08)', border: '1px solid rgba(0,168,132,0.1)' }}>
        <MessageCircleIcon className="w-8 h-8" style={{ color: '#00A884' }} />
      </div>
      <div>
        <h4 className="font-medium mb-1" style={{ color: '#E9EDEF' }}>No conversations yet</h4>
        <p className="text-sm px-6" style={{ color: 'rgba(233,237,239,0.35)' }}>Start a new chat by selecting a contact</p>
      </div>
      <button onClick={() => setActiveTab("contacts")} className="px-4 py-2 text-sm rounded-xl transition-all duration-200" style={{ color: '#00A884', background: 'rgba(0,168,132,0.08)', border: '1px solid rgba(0,168,132,0.1)' }}>
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;