const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    Post.find()
        .exec()
        .then(docs => {
            res.status(201).json({
                posts: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

router.post('/posts', (req, res) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
    });
    post.save()
        .select('_id title description date')
        .then(data => {
            res.status(200).json({
                message: 'Post created successfully',
                post: data
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .exec()
        .then(doc => {
            res.status(200).json({
                post: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

router.patch('/:postId', (req, res) => {
    Post.updateOne({_id: req.params.postId}, {$set: {title: req.body.title}})
    .exec()
    .then(doc => {
        res.status(201).json({
            message: 'Post updated successfully',
            post: doc
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

});

router.delete('/:postId', (req, res )=> {
    Post.findByIdAndRemove(req.params.postId)
    .exec()
    .then(doc => {
        res.status(200).json({
            message: 'Post deleted successfully',
            post: doc
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

});

module.exports = router;