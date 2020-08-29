const mongoose = require('mongoose');
const createError = require('http-errors');

const Message = require('./../models/Message')

module.exports = {

    createNewMessage: async (req, res, next) => {
        try {
            const message = new Message(req.body);
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
            const id = req.params.id;
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
        const id = req.params.id;
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
