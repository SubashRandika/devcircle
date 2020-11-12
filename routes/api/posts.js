const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const validatePostInput = require('../../validation/post');

// get post model from
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// get all posts
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then((posts) => res.status(200).json(posts))
		.catch((err) => res.status(404).json({ posts: 'Cannot fetch posts' }));
});

// get one post by id
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.status(200).json(post))
		.catch((err) =>
			res.status(404).json({ post: 'No post exists with that id' })
		);
});

// create a post
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		// validate post payload
		if (!isValid) {
			return res.status(400).json({ ...errors });
		}

		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});

		newPost
			.save()
			.then((post) => res.status(200).json(post))
			.catch((err) => res.status(400).json(err));
	}
);

// delete a post
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then((profile) => {
			Post.findById(req.params.id).then((post) => {
				// check whether post is already exists
				if (!post) {
					return res.status(404).json({ post: 'No post found' });
				}

				// check whether post owner is going to delete this post
				if (post.user.toString() !== req.user.id) {
					return res
						.status(401)
						.json({ authorization: 'User not authorized to delete the post' });
				}

				// remove post
				post
					.remove()
					.then(() =>
						res.status(200).json({
							success: true,
							message: 'Post successfully deleted.'
						})
					)
					.catch((err) =>
						res.status(404).json({ post: 'No post found to delete' })
					);
			});
		});
	}
);

module.exports = router;
