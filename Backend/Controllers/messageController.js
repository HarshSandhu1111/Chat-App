const asynchandler = require("express-async-handler");
const User  = require('../models/usermodels');
const Chat = require("../models/chatmodel");
const Message = require("../models/messagemodel");

const sendmessage = async(req, res) => {
    console.log(req.body);

    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data");
        return res.sendStatus(404);
    }

    var newmessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    };

    try {
        var message = await Message.create(newmessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat","-updatedAt");

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { latestMessage: message }, 
            { new: true } 
        )
        .populate("latestMessage")
        .populate({
            path: "latestMessage",
            populate: { path: "sender", select: "name pic" }
        });
        
          res.json(updatedChat);
        
    

        // res.json(message);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

const allmessage = async(req,res)=>{
    try{
    const allchats = await Message.find({chat:req.params.chatId}).populate("sender" , "name pic").populate("chat");
    res.json(allchats);
}

catch(error){
    console.log(error);

}
}

module.exports = { sendmessage,allmessage};

