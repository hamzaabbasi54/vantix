import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

// We store a reference to getSelectedUser so the socket listener can check it synchronously
let _getSelectedUser = () => null;
export const setSelectedUserGetter = (fn) => { _getSelectedUser = fn; };

export const useAuthStore = create((set, get) => ({

    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],
    unreadCounts: {},

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in authCheck:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully!");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null, unreadCounts: {} });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error("Error logging out");
            console.log("Logout error:", error);
        }
    },
    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in update profile:", error);
            toast.error(error.response.data.message);
        }
    },

    // ── Unread Counts ──
    fetchUnreadCounts: async () => {
        try {
            const res = await axiosInstance.get("/messages/unread-counts");
            set({ unreadCounts: res.data });
        } catch (error) {
            console.log("Error fetching unread counts:", error);
        }
    },

    markAsRead: async (userId) => {
        try {
            await axiosInstance.put(`/messages/mark-read/${userId}`);
            const { unreadCounts } = get();
            const updated = { ...unreadCounts };
            delete updated[userId];
            set({ unreadCounts: updated });
        } catch (error) {
            console.log("Error marking as read:", error);
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) {
            return;
        }
        const socket = io(BASE_URL, { withCredentials: true });
        set({ socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });

        // Global real-time unread counter
        socket.on("newMessage", (newMessage) => {
            const selectedUser = _getSelectedUser();
            // Only increment if user does NOT have the sender's chat open
            if (!selectedUser || newMessage.senderId !== selectedUser._id) {
                const { unreadCounts } = get();
                const senderId = newMessage.senderId;
                set({
                    unreadCounts: {
                        ...unreadCounts,
                        [senderId]: (unreadCounts[senderId] || 0) + 1,
                    },
                });
            }
        });

        // Fetch initial unread counts
        get().fetchUnreadCounts();
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            set({ socket: null });
        }
    }
}));