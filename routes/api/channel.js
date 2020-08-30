const express = require('express');
const router = express.Router();

const ChannelController = require('./../../controllers/channel.Controller');


//Create a new Channel
router.post('/:postId/channel', ChannelController.createNewChannel);

//Get a Channel by postId
router.get('/:postId/channel', ChannelController.findChannelByPostId);

//Update a Channel by postId
router.put('/:postId/channel', ChannelController.updateAChannel);

//Delete a Channel by postId
router.delete('/:postId/channel', ChannelController.deleteAChannel);

module.exports = router;
