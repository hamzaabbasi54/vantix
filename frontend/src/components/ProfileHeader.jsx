import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="size-11 rounded-full overflow-hidden relative group transition-all duration-300" style={{ boxShadow: '0 0 0 2px rgba(0,168,132,0.25)' }} onClick={() => fileInputRef.current.click()}>
              <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="User" className="size-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <span className="absolute bottom-0 right-0 online-dot" />
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
          </div>
          <div>
            <h3 className="font-semibold text-sm max-w-[160px] truncate" style={{ color: '#E9EDEF' }}>{authUser.fullName}</h3>
            <p className="text-xs font-medium" style={{ color: '#00A884' }}>Online</p>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <button className="size-8 flex items-center justify-center rounded-lg transition-all duration-200" style={{ color: 'rgba(233,237,239,0.3)' }} onClick={logout}>
            <LogOutIcon className="size-4" />
          </button>
          <button className="size-8 flex items-center justify-center rounded-lg transition-all duration-200" style={{ color: 'rgba(233,237,239,0.3)' }} onClick={() => { mouseClickSound.currentTime = 0; mouseClickSound.play().catch(() => { }); toggleSound(); }}>
            {isSoundEnabled ? <Volume2Icon className="size-4" /> : <VolumeOffIcon className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;