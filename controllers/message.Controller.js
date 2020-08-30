const mongoose = require('mongoose');
const createError = require('http-errors');

const Message = require('./../models/Message')

module.exports = {

    getAllMessages: async (req, res, next) => {
        try {
            const postId = req.params.postId

            const post = await Post.findById(postId)
            if (!post) {
                return console.log("Post not found")
            }
            // not sure if this works
            const channel_id = post.Channel
            const results = await Message.find({ channel: channel_id }, { __v: 0 });
            if (!results) {
                return console.log("No messages found . Error or Empty")
            }
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },


    createNewMessage: async (req, res, next) => {
        try {
            const postId = req.params.postId
            const post = await Post.findById(postId)
            if (!post) {
                return console.log("No post found")
            }
            const channel_id = post.channel
            const message = new Message({ ...req.body, channel: channel_id });
            const result = await message.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },


    updateAMessage: async (req, res, next) => {
        try {
            const id = req.params.messageId;
            const updates = req.body;
            const options = { new: true };

            const result = await Message.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'Message does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid Message Id'));
            }

            next(error);
        }
    },

    deleteAMessage: async (req, res, next) => {
        const id = req.params.messageId;
        try {
            const result = await Message.findByIdAndDelete(id);
            // console.log(result);
            if (!result) {
                throw createError(404, 'Message does not exist.');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Message id'));
                return;
            }
            next(error);
        }
    }
};
