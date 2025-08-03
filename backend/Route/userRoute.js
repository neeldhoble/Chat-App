import express from 'express';
import isLogin from '../middleware/isLogin.js';
import { getUserBySearch, getCurrentFriends } from '../Controllers/userHandlerController.js';

const router = express.Router();

router.get('/search',isLogin, getUserBySearch);

router.get('/currentFriends',isLogin, getCurrentFriends);




export default router;