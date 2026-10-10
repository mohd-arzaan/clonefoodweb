const commentModel = require('../models/comment.model');
const foodModel = require('../models/food.model');

async function addComment(req, res) {
    try {
        const { foodId, text } = req.body;
        const user = req.user;

        if (!text || !text.trim()) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const comment = await commentModel.create({
            user: user._id,
            food: foodId,
            text: text.trim()
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { commentsCount: 1 }
        });

        const populatedComment = await comment.populate('user', 'fullName name');

        res.status(201).json({
            message: "Comment added successfully",
            comment: populatedComment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function getComments(req, res) {
    try {
        const { foodId } = req.params;

        const comments = await commentModel
            .find({ food: foodId })
            .populate('user', 'fullName name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Comments fetched successfully",
            comments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { addComment, getComments };