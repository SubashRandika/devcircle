const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();

// load user model
const User = require('../../models/User');

router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: 'Email already taken' });
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200', // size
				r: 'pg', // rating
				d: 'mm' // default
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) {
						res.status(500).json({ password: 'cannot perform hashing' });
					}

					newUser.password = hash;
					newUser
						.save()
						.then((user) => {
							res.status(201).json(user);
						})
						.catch((err) => {
							console.error(err);
						});
				});
			});
		}
	});
});

module.exports = router;
