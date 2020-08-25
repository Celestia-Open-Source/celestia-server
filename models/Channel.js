const mongoose = require('mongoose')

const ChannelSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    public: Boolean,
})

const model = mongoose.model("Channel", ChannelSchema);

module.exports = model;
