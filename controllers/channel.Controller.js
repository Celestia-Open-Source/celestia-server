const mongoose = require('mongoose');
const createError = require('http-errors');

const Channel = require('./../models/Channel')

module.exports = {

    // Not needed for now - our channels are connected to the posts so need to fetch all channels

    // getAllChannels: async (req, res, next) => {
    //     try {
    //         const results = await Channel.find({}, { __v: 0 });
    //         res.send(results);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // },

    findChannelByPostId: async (req, res, next) => {
        const id = req.params.postId;
        try {
            const post = await Post.findById(id);
            // const post = await Post.findOne({ _id: id });
            if (!post.channel) {
                throw createError(404, 'Channel does not exist.');
            }
            res.send(post.channel);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Channel'));
                return;
            }
            next(error);
        }
    },

    createNewChannel: async (req, res, next) => {
        try {
            const channel = new Channel(req.body);
            const id = req.params.id;

            const channel_result = await channel.save(async (err) => {
                if (err) return console.log(err);

                const post = await Post.findOneAndUpdate({ _id: id }, {
                    channel: channel._id
                }, {
                    new: true
                });

                post.save(function (err) {
                    if (err) return handleError(err);
                    res.send(channel)
                });
            });

            if (!channel_result) {
                res.send("Couldn't save channel")
            }
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },

    updateAChannel: async (req, res, next) => {
        try {
            const id = req.params.postId;
            const updates = req.body;
            const options = { new: true };

            const result = await Channel.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'Channel does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid Channel Id'));
            }

            next(error);
        }
    },

    deleteAChannel: async (req, res, next) => {
        const id = req.params.postId;
        try {
            const result = await Channel.findByIdAndDelete(id);
            // console.log(result);
            if (!result) {
                throw createError(404, 'Channel does not exist.');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Channel id'));
                return;
            }
            next(error);
        }
    }
};
