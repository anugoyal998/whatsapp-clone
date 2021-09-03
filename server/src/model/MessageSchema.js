const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    message: {
        type: String
    },
    audioNPM: String
},
    {
        timestamps: true,
    }
)

const MessageModel = new mongoose.model('Message', MessageSchema);

module.exports = MessageModel;