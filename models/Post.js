const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    body: {
        type: Schema.Types.String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }
})

const model = mongoose.model("Post", PostSchema)
module.exports = model