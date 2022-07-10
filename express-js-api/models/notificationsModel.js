const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
    dateTime: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        required: false,
    }
});

const Notifications = mongoose.model("Notifications", NotificationsSchema);

module.exports = Notifications;