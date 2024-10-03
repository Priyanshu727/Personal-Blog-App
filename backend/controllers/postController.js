const mongoose = require('mongoose');
const Post = require('../models/postModel');

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts',
            error: error.message
        });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid post ID'
            });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch the post',
            error: error.message
        });
    }
};

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: newPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create post',
            error: error.message
        });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid post ID'
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: updatedPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update post',
            error: error.message
        });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid post ID'
            });
        }

        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        res.status(204).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete post',
            error: error.message
        });
    }
};
