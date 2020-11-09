const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

// load profile model
const Profile = require('../../models/Profile');
// load user models
const User = require('../../models/User');

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				if (!profile) {
					errors.noprofile = 'There is no profile for this user';
					return res.status(404).json({ ...errors });
				}

				return res.status(200).json({ ...profile });
			})
			.catch((err) => res.status(404).json(err));
	}
);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const profileFields = {
			...req.body,
			user: req.user.id
		};

		Profile.findOne({ user: req.user.id }).then((profile) => {
			if (profile) {
				// update existing profile fields
				Profile.findOneAndUpdate({ user: req.user.id }, profileFields, {
					new: true
				})
					.then((profile) => {
						return res.status(200).json({ ...profile });
					})
					.catch((err) => {
						return res
							.status(500)
							.json({ message: 'Failed. Unable to update the profile.' });
					});
			} else {
				// checks user handle already taken
				Profile.findOne({ handle: profileFields.handle }).then((profile) => {
					if (profile) {
						errors.handle = 'User handle already taken';
						return res.status(400).json({ ...errors });
					}

					// creates a new profile
					new Profile(profileFields)
						.save()
						.then((profile) => {
							return res.status(201).json({ ...profile });
						})
						.catch((err) => {
							return res.status(500).json({
								message: 'Failed. Unable create your profile.'
							});
						});
				});
			}
		});
	}
);

module.exports = router;
