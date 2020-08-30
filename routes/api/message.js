const express = require('express');
const router = express.Router();

const MessageController = require('./../../controllers/message.Controller');


//Create a new Message
router.post('/:postId/message/', MessageController.createNewMessage);

//Get all Messages by postId
router.get('/:postId/message', MessageController.getAllMessages);

//Update a Message by postId
router.put('/:postId/message/:messageId', MessageController.updateAMessage);

//Delete a Message by postId
router.delete('/:postId/message/:messageId', MessageController.deleteAMessage);

module.exports = router;
