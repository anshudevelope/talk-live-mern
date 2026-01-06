import express from 'express';
import { getMessages, getUserForSidebar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js';
import protectedRoute from '../middleware/auth.js';

const messageRouter = express.Router();

messageRouter.get('/users', protectedRoute, getUserForSidebar);
messageRouter.get('/:id', protectedRoute, getMessages);
messageRouter.get('/mark/:id', protectedRoute, markMessageAsSeen);
messageRouter.post('/send/:id', protectedRoute, sendMessage);

export default messageRouter;