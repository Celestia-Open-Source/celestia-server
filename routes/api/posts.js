const express = require('express');
const router = express.Router();

const PostController = require('../../controllers/post.Controller');

//Get a list of all Posts
router.get('/', PostController.getAllPosts);

//Create a new Post
router.post('/', PostController.createNewPost);

//Get a Post by id
router.get('/:id', PostController.findPostById);

//Update a Post by id
router.put('/:id', PostController.updateAPost);

//Delete a Post by id
router.delete('/:id', PostController.deleteAPost);

module.exports = router;
