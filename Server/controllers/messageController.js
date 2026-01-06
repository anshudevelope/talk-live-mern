import cloudinary from "../lib/cloudinary.js";
import Message from "../model/message.js"
import User from "../model/user.js";
import {io, userSocketMap} from "../server.js"

// Get all the users expect the logged in user
export const getUserForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const flteredUser = await User.find({ _id: { $ne: userId } }).select("-password");
        // count no of unseen messges from each user
        const unseenMessage = {};
        const promises = flteredUser.map(async (user) => {
            const messages = await Message.find({ sender: user._id, receiver: userId, seen: false });
            if (messages.length > 0) {
                unseenMessage[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.status(200).json({ success: true, users: flteredUser, unseenMessage });
    } catch (error) {
        console.error("Error in getUserForSidebar:", error.message);
        res.status(500).json({ success: false, message: error });
    }
}

// Get all messages for selected user
export const getMessages = async (req, res) => {
    try {

        const { id: selectedUserId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: selectedUserId },
                { sender: selectedUserId, receiver: myId }
            ]
        });

        // mark all messages as seen where sender is selectedUserId and receiver is myId
        await Message.updateMany(
            { sender: selectedUserId, receiver: myId },
            { seen: true }
        );

        res.status(200).json({ success: true, messages });

    } catch (error) {
        console.error("Error in getMessages:", error.message);
        res.status(500).json({ success: false, message: error });
    }
}

// api to mark messages as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true });
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Send messages to selected user
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        // Emit the new message to the reciever's socket if online
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json({ success: true, newMessage });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

