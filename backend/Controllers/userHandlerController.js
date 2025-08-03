import User from "../models/userModels.js";
import Conversation from '../Models/conversationModels.js';



export const getUserBySearch =async (req,res)=>{
    try{
        const search = req.query.search || '';
        const currentUserId = req.user._conditions._id;
        const user = await User.find({
            $and:[
                {
                    $or:[
                        {username:{$regex:'.*'+search+'.*',$options:'i'}},
                        {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                    ]
                },
                {
                    _id:{$ne:currentUserId}
                }
            ]
        }).select("-password").select("email")

        res.status(200).send(user)
        
    }
    catch(e){
        res.status(500).send({
            success: false,
            message: e.message
        })
        console.log(e);
        
    }
}



export const getCurrentFriends = async(req,res)=>{
    try{
        const currentUserId = req.user._conditions._id;
        const currentFriends = await Conversation.find({
            participants:currentUserId
        }).sort({
            updatedAt: -1
        })

        if(!currentFriends || currentFriends.length === 0) return res.status(200).send([]);
        
        const participantsIds = currentFriends.reduce((ids,conversation)=>{
            const otherParticipants = conversation.participants.filter(id => id !== currentUserId)
            return [...ids, ...otherParticipants]
        },[]);0

        // const otherParticipantsIds = participantsIds.filter(id => id.toString() !== currentUserId.toString())
        const otherParticipantsIds = participantsIds.filter(id => id && id.toString() !== currentUserId.toString());


        const user = await User.find({_id:{$in:otherParticipantsIds}}).select("-password").select("-email");

        const users = otherParticipantsIds.map(id => user.find(user => user._id.toString() === id.toString()));

        res.status(200).send(users)

    }
    catch(e){
        res.status(500).send({
            success: false,
            message: e.message
        })
        console.log(e);
    }
}