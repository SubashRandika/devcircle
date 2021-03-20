const Validator = require('validator');
const isEmpty = require('../utils/global');

const validateCommentInput = (data) => {
	let errors = {};

	data.comment = !isEmpty(data.comment) ? data.comment : '';

	if (Validator.isEmpty(data.comment)) {
		errors.comment = 'Please type a comment here';
	} else if (!Validator.isLength(data.comment, { min: 10 })) {
		errors.comment = 'comment must contains at least 10 characters';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateCommentInput;
