import express from 'express';
import { sendMessage, getMessages } from '../Controllers/messageController.js';
import isLogin from '../middleware/isLogin.js';

const route = express.Router();

route.post('/send/:id',isLogin, sendMessage)

route.get('/:id',isLogin, getMessages)

export default route;