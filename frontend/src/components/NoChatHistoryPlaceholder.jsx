import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(0,168,132,0.08)', border: '1px solid rgba(0,168,132,0.1)' }}>
        <MessageCircleIcon className="size-8" style={{ color: '#00A884' }} />
      </div>
      <h3 className="text-lg font-medium mb-3" style={{ color: '#E9EDEF' }}>Start your conversation with {name}</h3>
      <div className="flex flex-col space-y-3 max-w-md mb-5">
        <p className="text-sm" style={{ color: 'rgba(233,237,239,0.35)' }}>This is the beginning of your conversation. Send a message to start chatting!</p>
        <div className="h-px w-32 mx-auto" style={{ background: 'linear-gradient(to right, transparent, rgba(0,168,132,0.2), transparent)' }}></div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {["👋 Say Hello", "🤝 How are you?", "📅 Meet up soon?"].map((text) => (
          <button key={text} className="px-4 py-2 text-xs font-medium rounded-full transition-all duration-200" style={{ color: '#00A884', background: 'rgba(0,168,132,0.06)', border: '1px solid rgba(0,168,132,0.08)' }}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};
export default NoChatHistoryPlaceholder;