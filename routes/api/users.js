const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const privateKey = require('../../config/keys').privateKey;

const router = express.Router();

// load user model
const User = require('../../models/User');

router.post('/register', (req, res) => {
	const { name, email, password } = req.body;

	User.findOne({ email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: 'Email already taken' });
		} else {
			const avatar = gravatar.url(email, {
				s: '200', // size
				r: 'pg', // rating
				d: 'mm' // default
			});

			const newUser = new User({
				name,
				email,
				avatar,
				password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) {
						res
							.status(500)
							.json({ message: 'cannot perform password hashing' });
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

router.post('/login', (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(404).json({ email: 'user cannot be found' });
		}

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				const payload = {
					id: user.id,
					email: user.email,
					name: user.name,
					avatar: user.avatar
				};

				jwt.sign(payload, privateKey, { expiresIn: 3600 }, (err, token) => {
					if (err) {
						res.status(500).json({ message: 'token cannot be generated' });
					}

					res.status(200).json({ success: true, token: `Bearer ${token}` });
				});
			} else {
				res.status(400).json({ password: 'password is incorrect' });
			}
		});
	});
});

router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { id, name, email } = req.user;

		res.status(200).json({
			id,
			name,
			email
		});
	}
);

module.exports = router;
