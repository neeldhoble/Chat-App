import Conversation from '../Models/conversationModels.js';
import Message from '../Models/messageModels.js';
import { getRecieverSocketId, io } from '../Socket/socket.js';

export const sendMessage = async(req,res)=>{
    try{
        const {message} = req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user._conditions._id;

        let chats = await Conversation.findOne({
            participants:{$all: [senderId, recieverId]}
        })

        if(!chats){
            chats = await Conversation.create({
                participants:[senderId, recieverId],
            })
        }

        const newMessages = new Message({
            senderId,
            recieverId,
            message,
            conversationId: chats._id
        })

        if(newMessages){
            chats.messages.push(newMessages._id)
        }

        // Socket.io code
        const recieverSocketId = getRecieverSocketId(recieverId)
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", newMessages)
        }

        await Promise.all([chats.save(), newMessages.save()])

        res.status(201).send(newMessages)
    }
    catch(e){
        res.status(500).send({
            success: false,
            message: e.message
        })
    }
}




export const getMessages =async (req,res)=>{
    try{
        const {id:recieverId} = req.params;
        const senderId = req.user._conditions._id;

        const chats = await Conversation.findOne({
            participants:{$all: [senderId, recieverId]}
        }).populate("messages")

        if(!chats) return res.status(200).send([]);
        const message = chats.messages;
        res.status(200).send(message)
    }
    catch(e){
        res.status(500).send({
            success: false,
            message: e.message
        })
    }
}