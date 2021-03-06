const Validator = require('validator');
const isEmpty = require('../utils/global');

const validateProfileInput = (data) => {
	let errors = {};

	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.status = !isEmpty(data.status) ? data.status : '';

	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'Profile handle field is required';
	} else if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle =
			'Handle must be at least 2 characters and less than 40 characters';
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = 'Status field is required';
	}

	if (!data.skills) {
		errors.skills = 'Skills field is required';
	} else if (data.skills.length === 0) {
		errors.skills = 'At least one skill required';
	}

	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = 'Not a valid URL format';
		}
	}

	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = 'Not a valid URL format';
		}
	}

	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.twitter)) {
			errors.twitter = 'Not a valid URL format';
		}
	}

	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = 'Not a valid URL format';
		}
	}

	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = 'Not a valid URL format';
		}
	}

	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = 'Not a valid URL format';
		}
	}

	if (!isEmpty(data.github)) {
		if (!Validator.isURL(data.github)) {
			errors.github = 'Not a valid URL format';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateProfileInput;
