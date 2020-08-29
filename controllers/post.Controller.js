const createError = require('http-errors');
const mongoose = require('mongoose');

const Post = require('../Models/Post.model');

module.exports = {
    getAllPosts: async (req, res, next) => {
        try {
            const results = await Post.find({}, { __v: 0 });
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    createNewPost: async (req, res, next) => {
        try {
            const post = new Post(req.body);
            const result = await post.save();
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

    findPostById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            // const post = await Post.findOne({ _id: id });
            if (!post) {
                throw createError(404, 'Post does not exist.');
            }
            res.send(post);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Post id'));
                return;
            }
            next(error);
        }
    },

    updateAPost: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

            const result = await Post.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'Post does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid Post Id'));
            }

            next(error);
        }
    },

    deleteAPost: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            // console.log(result);
            if (!result) {
                throw createError(404, 'Post does not exist.');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid Post id'));
                return;
            }
            next(error);
        }
    }
};
