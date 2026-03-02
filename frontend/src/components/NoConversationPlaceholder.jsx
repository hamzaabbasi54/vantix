import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(0,168,132,0.08)', border: '1px solid rgba(0,168,132,0.1)' }}>
        <MessageCircleIcon className="size-10" style={{ color: '#00A884' }} />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#E9EDEF' }}>Select a conversation</h3>
      <p className="max-w-md text-sm" style={{ color: 'rgba(233,237,239,0.35)' }}>Choose a contact from the sidebar to start chatting or continue a previous conversation.</p>
    </div>
  );
};
export default NoConversationPlaceholder;