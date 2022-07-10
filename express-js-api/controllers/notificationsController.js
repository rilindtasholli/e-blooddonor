const Notifications = require("../models/notificationsModel");
const catchAsync = require("../utils/catchAsync");


exports.getAllNotifications = catchAsync(async (req, res, next) => {
    const notifications = await Notifications.find();

    res.status(200).json({
        status: "success",
        notifications
    });
});

exports.createNotifications = catchAsync(async (req, res, next) => {
    const notifications = await Notifications.create({
        dateTime: req.body.dateTime,
        title: req.body.title,
        description: req.body.description,
        seen: req.body.seen,
    });

    res.status(200).json({
        status: "success",
        notifications
    });
});

exports.deleteNotifications = catchAsync(async (req, res, next) => {
    const notifications = await Notifications.findByIdAndDelete(req.params.id);

    if (notifications == null) {
        res.status(404).json({
            status: 'fail',
            message: "Couldn't find the notification!"
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'Notification Deleted!',
    })
});