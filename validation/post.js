const Validator = require('validator');
const isEmpty = require('../utils/global');

const validatePostInput = (data) => {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	if (Validator.isEmpty(data.text)) {
		errors.text = 'Text field is required';
	} else if (!Validator.isLength(data.text, { min: 10 })) {
		errors.text = 'Text must be at least 10 characters';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validatePostInput;
