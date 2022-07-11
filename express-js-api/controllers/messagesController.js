const Messages = require("../models/messagesModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllMessages = catchAsync(async(req,res,next)=>{
    const messages = await Messages.find();

    req.status(200).json({
        status:"success",
        messages
    });
});

exports.createMessage = catchAsync(async(req,res,next)=>{
    const message = await Messages.create({
        datetime: req.body.datetime,
        title: req.body.title,
        message: req.body.message,
        email: req.body.email
    });

    res.status(200).json({
        status: "success",
        message
    });
});

exports.deleteMessage = catchAsync(async(req,res,next)=>{
    const message = await Messages.findByIdAndDelete(req.params.id);

    if(log == null){
        res.status(404).json({
            status: 'fail',
            message:"Couldn't find the log!"
        })
    }

    res.status(200).json({
        status:"success",
        message: "Message deleted",
    })
});