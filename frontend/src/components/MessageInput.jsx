import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound.js";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();
    sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; };

  return (
    <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }} />
            <button onClick={removeImage} className="absolute -top-2 -right-2 size-5 rounded-full flex items-center justify-center" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', color: '#E9EDEF' }} type="button">
              <XIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-2.5">
        <input
          type="text" value={text}
          onChange={(e) => { setText(e.target.value); isSoundEnabled && playRandomKeyStrokeSound(); }}
          className="flex-1 py-2.5 px-4 rounded-xl transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: '#E9EDEF' }}
          placeholder="Type your message..."
          onFocus={(e) => { e.target.style.borderColor = 'rgba(0,168,132,0.3)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.06)'; }}
        />
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        <button type="button" onClick={() => fileInputRef.current?.click()}
          className="size-10 flex items-center justify-center rounded-xl transition-all duration-200"
          style={{ background: imagePreview ? 'rgba(0,168,132,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${imagePreview ? 'rgba(0,168,132,0.2)' : 'rgba(255,255,255,0.06)'}`, color: imagePreview ? '#00A884' : 'rgba(233,237,239,0.3)' }}>
          <ImageIcon className="w-4 h-4" />
        </button>
        <button type="submit" disabled={!text.trim() && !imagePreview}
          className="size-10 flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
          style={{ background: '#00A884', color: 'white' }}>
          <SendIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;