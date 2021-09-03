const express = require('express');
const UserController = require('../controller/UserController');
const UserSchema = require('../model/UserSchema');
const router = new express.Router();
const ConversationSchema = require('../model/ConversationSchema')
const MessageSchema = require('../model/MessageSchema')
//storing user info to db
router.post('/add-user',UserController)
//all users from db
router.get('/get-all-users', async (req, res) => {
    try {
        const data = await UserSchema.find({});
        res.status(200).json(data);
    } catch (error) {
        console.log('Error in getting users from db: ', error);
    }
})

//add converstation
router.post("/conversation/add", async (req,res)=> {
    let sId = req.body.sId;
    let rId = req.body.rId;
    try {
        if(!sId || !rId){
            res.status(500).json("missing field");
            return;
        }
        const findConversation = await ConversationSchema.findOne({members: { $all: [sId, rId]}})
        if(!findConversation){
            const newConversation = new ConversationSchema({
                members: [sId, rId],
            })
            await newConversation.save();
            res.status(200).json("newConversation added successfully")
            console.log("newConversation addeed")
        }else{
            res.status(200).json("conversation already exists")
            console.log("newConversation already exists")
        }
    } catch (error) {
        console.log("Error while adding conversation", error)
    }
})

//get conversation id
router.post("/get-conversation-id", async (req, res) => {
    try{
        const conversation = await ConversationSchema.findOne({members: {$all: [req.body.sId,req.body.rId]}});
        if(!conversation)return;
        res.status(200).json(conversation)
    }catch(error) {
        console.log("Error while getting conversation id", error)
    }
})

//add message to db
router.post("/message/add",async (req, res)=> {
    try{
        let message = req.body.message
        let audioNPM = req.body.audioNPM
        if(message || audioNPM){
            const newMessage = new MessageSchema(req.body)
            await newMessage.save();
            return res.status(200)
        }
    }catch(error){
        console.log("Error while adding message", error)
    }
})

//get all messages with conversation id
router.get("/get/message/:id",async (req, res)=> {
    try {
        const data = await MessageSchema.find({conversationId: req.params.id})
        res.status(200).json(data)
    } catch (error) {
        console.log("error in get message", error);
    }
})


module.exports = router