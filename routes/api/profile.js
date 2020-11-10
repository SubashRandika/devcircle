const express = require('express');
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const router = express.Router();

// load profile model
const Profile = require('../../models/Profile');

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.then((profile) => {
				if (!profile) {
					errors.noprofile = 'There is no profile for this user';
					return res.status(404).json({ ...errors });
				}

				return res.status(200).json(profile);
			})
			.catch((err) => res.status(404).json(err));
	}
);

const createProfileObject = (req) => {
	const profileObject = {};

	profileObject.user = req.user.id;

	if (req.body.handle) {
		profileObject.handle = req.body.handle;
	}

	if (req.body.company) {
		profileObject.company = req.body.company;
	}

	if (req.body.website) {
		profileObject.website = req.body.website;
	}

	if (req.body.location) {
		profileObject.location = req.body.location;
	}

	if (req.body.status) {
		profileObject.status = req.body.status;
	}

	if (req.body.bio) {
		profileObject.bio = req.body.bio;
	}

	if (req.body.githubusername) {
		profileObject.githubusername = req.body.githubusername;
	}

	if (req.body.skills) {
		profileObject.skills = req.body.skills.split(',');
	}

	// social object creation
	profileObject.social = {};

	if (req.body.youtube) {
		profileObject.social.youtube = req.body.youtube;
	}

	if (req.body.twitter) {
		profileObject.social.twitter = req.body.twitter;
	}

	if (req.body.facebook) {
		profileObject.social.facebook = req.body.facebook;
	}

	if (req.body.linkedin) {
		profileObject.social.linkedin = req.body.linkedin;
	}

	if (req.body.instagram) {
		profileObject.social.instagram = req.body.instagram;
	}

	if (req.body.github) {
		profileObject.social.github = req.body.github;
	}

	return profileObject;
};

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);

		// validate profile payload
		if (!isValid) {
			return res.status(400).json({ ...errors });
		}

		// get ans set new profile
		const profileFields = createProfileObject(req);

		Profile.findOne({ user: req.user.id }).then((profile) => {
			if (profile) {
				// update existing profile fields
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				)
					.then((profile) => {
						return res.status(200).json(profile);
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
							return res.status(201).json(profile);
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
