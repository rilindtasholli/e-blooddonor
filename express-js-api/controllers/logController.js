const Log = require("../models/logModel");
const catchAsync = require("../utils/catchAsync");


exports.getAllLogs = catchAsync(async (req, res, next) => {
    const logs = await Log.find();

    res.status(200).json({
        status: "success",
        logs
    });
});

exports.createLog = catchAsync(async (req, res, next) => {
    const log = await Log.create({
        dateTime: req.body.dateTime,
        userId: req.body.userId,
        user: req.body.user,
        action: req.body.action,
    });

    res.status(200).json({
        status: "success",
        log
    });
});

exports.deleteLog = catchAsync(async (req, res, next) => {
    const log = await Log.findByIdAndDelete(req.params.id);

    if(log == null){
        res.status(404).json({
            status: 'fail',
            message: "Couldn't find the log!"
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'Log Deleted!',
    })
});