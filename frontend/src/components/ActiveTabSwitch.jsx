import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex gap-1 p-2 mx-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <button
        onClick={() => setActiveTab("chats")}
        className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
        style={{ background: activeTab === "chats" ? 'rgba(0,168,132,0.1)' : 'transparent', color: activeTab === "chats" ? '#00C897' : 'rgba(233,237,239,0.35)' }}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
        style={{ background: activeTab === "contacts" ? 'rgba(0,168,132,0.1)' : 'transparent', color: activeTab === "contacts" ? '#00C897' : 'rgba(233,237,239,0.35)' }}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;