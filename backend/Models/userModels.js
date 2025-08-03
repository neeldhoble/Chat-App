import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    gender:{
        type: String,
        require: true,
        enum:["male","female","other"]
    },
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    profile:{
        type: String,
        require: true,
        default:""
    }
},{timestamps: true}); //tells the time when user is created

const User =mongoose.models.User || mongoose.model("User", userSchema);

export default User;