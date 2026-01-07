import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRouter.js'
import { Server } from "socket.io";

// Create express app and http server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
export const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

export const userSocketMap = {};

// Socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("New user connected:", userId);

    if (userId) userSocketMap[userId] = socket.id;

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", userId);
        if (userId) delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Setup middleware
app.use(express.json({ limit: '4mb' }));
app.use(cors());

// api routes
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use('/api/auth', userRouter)
app.use('/api/messages', messageRouter);

// connect Database
await connectDB();

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

// Export the server for veasal deployment
export default server;
