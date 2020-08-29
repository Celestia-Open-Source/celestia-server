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

    createNewChannel: async (req, res, next) => {
        try {
            const channel = new Channel(req.body);
            const result = await channel.save();
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

    updateAChannel: async (req, res, next) => {
        try {
            const id = req.params.id;
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
        const id = req.params.id;
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
