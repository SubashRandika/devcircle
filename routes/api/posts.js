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
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				Post.findById(req.params.id)
					.then((post) => {
						// check whether post is already exists
						if (!post) {
							return res
								.status(400)
								.json({ post: 'Cannot delete already deleted post' });
						}

						// check whether post owner is going to delete this post
						if (post.user.toString() !== req.user.id) {
							return res.status(401).json({
								authorization: 'User not authorized to delete the post'
							});
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
								res.status(400).json({ post: 'Unable to delete the post' })
							);
					})
					.catch((err) =>
						res.status(400).json({ post: 'No post found with this id' })
					);
			})
			.catch((err) =>
				res.status(400).json({ post: 'Unable to delete the post' })
			);
	}
);

// like the post
router.post(
	'/:id/like',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				Post.findById(req.params.id)
					.then((post) => {
						// check if user already liked the post
						if (
							post.likes.some((like) => like.user.toString() === req.user.id)
						) {
							return res
								.status(400)
								.json({ like: 'User already liked this post' });
						}

						// save likes into the post
						post.likes.unshift({ user: req.user.id });
						post
							.save()
							.then((post) => res.status(200).json(post))
							.catch((err) =>
								res.status(400).json({ like: 'Unable to like the post' })
							);
					})
					.catch((err) =>
						res.status(404).json({ post: 'No post found with this id' })
					);
			})
			.catch((err) =>
				res.status(400).json({ post: 'Unable to like the post' })
			);
	}
);

// dislike the post
router.post(
	'/:id/unlike',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				Post.findById(req.params.id)
					.then((post) => {
						// check if user already liked the post
						if (
							!post.likes.some((like) => like.user.toString() === req.user.id)
						) {
							return res
								.status(400)
								.json({ unlike: 'You have not like this post yet' });
						}

						// get the remove index of likes list
						const removeLikeIndex = post.likes.findIndex(
							(like) => like.user.toString() === req.user.id
						);

						// remove from likes list
						post.likes.splice(removeLikeIndex, 1);

						post
							.save()
							.then((post) => res.status(200).json(post))
							.catch((err) =>
								res.status(400).json({ like: 'Unable to unlike the post' })
							);
					})
					.catch((err) =>
						res.status(404).json({ post: 'No post found with this id' })
					);
			})
			.catch((err) =>
				res.status(400).json({ post: 'Unable to unlike the post' })
			);
	}
);

// add a comment to post
router.post(
	'/:id/comment',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		// validate post payload
		if (!isValid) {
			return res.status(400).json({ ...errors });
		}

		Post.findById(req.params.id)
			.then((post) => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				// add to comment to comments list
				post.comments.unshift(newComment);

				// save comments
				post
					.save()
					.then((post) => res.status(201).json(post))
					.catch((err) =>
						res.status(400).json({ comment: 'Unable to comment on this post' })
					);
			})
			.catch((err) =>
				res.status(404).json({ post: 'No post found with this id' })
			);
	}
);

// delete a comment to post
router.delete(
	'/:id/comment/:comment_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then((post) => {
				// check whether comment is exists
				if (
					!post.comments.some(
						(comment) => comment._id.toString() === req.params.comment_id
					)
				) {
					return res.status(404).json({ comment: 'Comment does not exist' });
				}

				// get index to remove the comment
				const removeIndex = post.comments.findIndex(
					(comment) => comment._id.toString() === req.params.comment_id
				);

				// remove comment from comment list
				post.comments.splice(removeIndex, 1);

				// save latest comments back to database
				post
					.save()
					.then((post) => res.status(201).json(post))
					.catch((err) =>
						res
							.status(400)
							.json({ comment: 'Unable to delete the comment on this post' })
					);
			})
			.catch((err) =>
				res.status(404).json({ post: 'No post found with this id' })
			);
	}
);

module.exports = router;
