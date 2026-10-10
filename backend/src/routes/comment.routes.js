const express = require('express');
const commentController = require('../controller/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Add comment (protected)
router.post('/', authMiddleware.authUserMiddleware, commentController.addComment);

// Get comments for a food item
router.get('/:foodId', commentController.getComments);

module.exports = router;