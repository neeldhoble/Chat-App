import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

const isLogin = (req,res,next)=>{
    try{
        
        const token = req.cookies.jwt;
        // console.log(token);
        if(!token) return res.status(500).send({success:false, message:'Unknown User'})
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) return res.status(500).send({success:false, message:'Invalid Token'})
        const user = User.findById(decoded.userId).select("-password");
        if(!user) return res.status(500).send({success:false, message:'User not found'})
        req.user = user;
        next();
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
}

export default isLogin;