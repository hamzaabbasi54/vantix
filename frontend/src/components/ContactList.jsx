import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => { getAllContacts(); }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div key={contact._id} className="glass-card p-3 cursor-pointer" onClick={() => setSelectedUser(contact)}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-10 rounded-full overflow-hidden" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}>
                <img src={contact.profilePicture || "/avatar.png"} alt={contact.fullName} className="w-full h-full object-cover" />
              </div>
              {onlineUsers.includes(contact._id) && <span className="absolute bottom-0 right-0 online-dot" />}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-sm truncate" style={{ color: '#E9EDEF' }}>{contact.fullName}</h4>
              <p className="text-xs" style={{ color: onlineUsers.includes(contact._id) ? '#00A884' : 'rgba(233,237,239,0.25)' }}>
                {onlineUsers.includes(contact._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;