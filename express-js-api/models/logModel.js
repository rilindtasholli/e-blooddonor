const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
    dateTime: {
        type: Date,
        default: Date.now
    },

    userId: {
        type: String,
        required: true,
    },

    user: {
        type: String,
        required: true,
    },
    
    action: {
        type: String,
        required: true,
    }
});

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;