// import User from '../Models/userModels.js';
// import bcryptjs from 'bcryptjs';
// import jwtToken from '../utils/jwtwebToken.js';



// export const userRegister =async (req,res) => {
//     try{
//         const {fullname, username, email, password, gender, profile} = req.body;
//         const user = await User.findOne({username, email});
//         if(user) return res.status(500).send({success:false,message:"UserName or Email already exist"})
//         const hashPassword = bcryptjs.hashSync(password, 10);
//         const profileboy = profile || `https://avatar.iran.liara.run/public/boy?username=${username}`;
//         const profilegirl = profile || `https://avatar.iran.liara.run/public/girl?username=${username}`;

//         const newUser = new User({
//             fullname,
//             username, 
//             email, 
//             password: hashPassword, 
//             gender, 
//             profile: profile === "male" ? profileboy : profilegirl
//         })
//         if(newUser){
//             await newUser.save();
//             jwtToken(newUser._id,res)
//         }
//         else{
//             res.status(500).send({success: false, message: "Invalid user data"})
//         }

//         res.status(201).send({
//             _id: newUser._id,
//             fullname: newUser.fullname,
//             username: newUser.username,
//             email: newUser.email,
//             profile: newUser.profile
//         })
//     }
//     catch(error){
//         res.status(500).send({
//             success: false,
//             error: error.message
//         })
//         console.log(error)
//     }
// }

// export const userLogin =async (req,res)=>{
//     try{
//         const {email, password} = req.body;
//         const user = await User.findOne({email})
//         if(!user) return res.status(400).send({success:false, message:"Email not found"})
//         const isMatch = bcryptjs.compareSync(password,user.password || "");
//         if(!isMatch) return res.status(400).send({success:false, message:"Invalid password"})

//         jwtToken(user._id,res)
//         res.send(200).send({
//             _id: user._id,
//             fullname: user.fullname,
//             username: user.username,
//             email: user.email,
//             profile: user.profile,
//             message: "Successfully Login"
//         })
//     }
//     catch(e){
//           res.status(500).send({
//             success: false,
//             message: e.message
//         })
//         console.log(e)
//     }
// }


































import User from '../Models/userModels.js';
import bcryptjs from 'bcryptjs';
import jwtToken from '../utils/jwtwebToken.js';

export const userRegister = async (req, res) => {
    try {
        const { fullname, username, email, password, gender, profile } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send({ success: false, message: "Username or Email already exists" });
        }

        const hashPassword = bcryptjs.hashSync(password, 10);
        
        const profileboy = profile || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profilegirl = profile || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profile: profile === "male" ? profileboy : profilegirl
        });

        await newUser.save();

        jwtToken(newUser._id, res);

        return res.status(201).send({
            success: true,
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            profile: newUser.profile,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ success: false, message: "Email not found" });
        }

        const isMatch = bcryptjs.compareSync(password, user.password || "");
        if (!isMatch) {
            return res.status(400).send({ success: false, message: "Invalid password" });
        }

        jwtToken(user._id, res);

        return res.status(200).send({
            success: true,
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            profile: user.profile,
            message: "Successfully logged in"
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};



// export const userLogout = async (req, res) => {
//     try {
//         req.cookies("jwt",'',{
//             maxAge: 0
//         })
//         return res.status(200).send({
//             success: true,
//             message: "Successfully logged out"
//         });
//     }
//     catch(e){
//         res.status(500).send({
//             success: false,
//             message: e.message
//         })
//         console.log(e)
//     }
// }









export const userLogout = async (req, res) => {
    try {
        // Clear the cookie named 'jwt'
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true, // set to true in production (HTTPS)
            sameSite: "None" // or "Strict"/"Lax" based on your frontend-backend setup
        });

        return res.status(200).send({
            success: true,
            message: "Successfully logged out"
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            success: false,
            message: e.message
        });
    }
};

