const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    body: {
        type: Schema.Types.String,
    },
    author: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    },
    tags: String,
})

const model = mongoose.model("Post", PostSchema)
module.exports = model