const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const validatePostInput = require('../../validation/post');

// get post model from
const Post = require('../../models/Post');

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
			.catch((err) => res.status(500).json(err));
	}
);

module.exports = router;
