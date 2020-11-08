const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
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
							.json({ password: 'cannot perform password hashing' });
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
				res.status(200).json({ message: 'Success' });
			} else {
				res.status(400).json({ password: 'password is incorrect' });
			}
		});
	});
});

module.exports = router;
