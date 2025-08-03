import express from 'express';
import { userRegister, userLogin, userLogout } from '../Controllers/authController.js';

const route = express.Router();

route.post("/register",userRegister)

route.post('/login',userLogin)

route.post('/logout',userLogout)

export default route;