const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({
    text: String,
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Channel",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated: Date,
});

const model = mongoose.model("Messages", MessagesSchema);

module.exports = model;
