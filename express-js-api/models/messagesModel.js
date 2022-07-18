const mongoose = require("mongoose");

const MessageSchema = 
mongoose.Schema({
    dateTime:{
        type:Date,
        default:Date.now
    },

    title:{
        type:String,
        required: true
    },

    message:{
        type:String,
        required: true
    },

    email:{
        type:String,
        required: true
    }
});

const Messages = mongoose.model("Messages", MessageSchema);

module.exports = Messages;