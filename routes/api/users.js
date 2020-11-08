const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const privateKey = require('../../config/keys').privateKey;
const validateRegisterInput = require('../../validation/register');
// load user model
const User = require('../../models/User');

const router = express.Router();

router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	// validate register payload
	if (!isValid) {
		return res.status(400).json({ ...errors });
	}

	const { name, email, password } = req.body;

	User.findOne({ email }).then((user) => {
		if (user) {
			errors.email = 'Email already taken';
			return res.status(400).json({ ...errors });
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
						return res
							.status(500)
							.json({ message: 'cannot perform password hashing' });
					}

					newUser.password = hash;
					newUser
						.save()
						.then((user) => {
							return res.status(201).json(user);
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
						return res
							.status(500)
							.json({ message: 'token cannot be generated' });
					}

					return res
						.status(200)
						.json({ success: true, token: `Bearer ${token}` });
				});
			} else {
				return res.status(400).json({ password: 'password is incorrect' });
			}
		});
	});
});

router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { id, name, email } = req.user;

		return res.status(200).json({
			id,
			name,
			email
		});
	}
);

module.exports = router;
