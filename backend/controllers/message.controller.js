import Message from "../models/message.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId, io } from "../config/socket.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedinuser = req.user._id;
        const filteredusers = await User.find({ _id: { $ne: loggedinuser } }).select("-password")
        res.status(200).json(filteredusers)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        }
        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
        }
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // emit the new message to the receiver in real-time
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};
export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            ),
        ].filter((id) => id !== loggedInUserId.toString());

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds, $ne: loggedInUserId } }).select("-password");

        res.status(200).json(chatPartners);
    } catch (error) {
        console.error("Error in getChatPartners: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get unread message counts grouped by sender
export const getUnreadCounts = async (req, res) => {
    try {
        const myId = req.user._id;

        const unreadCounts = await Message.aggregate([
            { $match: { receiverId: myId, read: false } },
            { $group: { _id: "$senderId", count: { $sum: 1 } } },
        ]);

        // Convert to { senderId: count } map
        const countsMap = {};
        unreadCounts.forEach((item) => {
            countsMap[item._id.toString()] = item.count;
        });

        res.status(200).json(countsMap);
    } catch (error) {
        console.log("Error in getUnreadCounts: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Mark all messages from a sender as read
export const markAsRead = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: senderId } = req.params;

        await Message.updateMany(
            { senderId, receiverId: myId, read: false },
            { $set: { read: true } }
        );

        res.status(200).json({ success: true });
    } catch (error) {
        console.log("Error in markAsRead: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};