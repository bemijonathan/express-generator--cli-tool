
var Model = require('../models'). addModelNameHere;

/**
 * postsController.js
 *
 * @description :: Server-side logic for managing posts.
 */

module.exports = {
    get: function (req, res) {
        Model.find(function (err, postss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting posts.',
                    error: err
                });
            }
            return res.json(postss);
        });
    },

    /**
     * postsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        Model.findOne({_id: id}, function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting posts.',
                    error: err
                });
            }
            if (!posts) {
                return res.status(404).json({
                    message: 'No such posts'
                });
            }
            return res.json(posts);
        });
    },

    /**
     * postsController.create()
     */
    create: function (req, res) {
        var posts = new Model({
        });

        posts.save(function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating posts',
                    error: err
                });
            }
            return res.status(201).json(posts);
        });
    },

    /**
     * postsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        Model.findOne({_id: id}, function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting posts',
                    error: err
                });
            }
            if (!posts) {
                return res.status(404).json({
                    message: 'No such posts'
                });
            }


            posts.save(function (err, posts) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating posts.',
                        error: err
                    });
                }

                return res.json(posts);
            });
        });
    },

    /**
     * postsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        Model.findByIdAndRemove(id, function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the posts.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
};