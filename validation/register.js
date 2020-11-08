const Validator = require('validator');
const isEmpty = require('../utils/global');

const validateRegisterInput = (data) => {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.confirmPassword = !isEmpty(data.confirmPassword)
		? data.confirmPassword
		: '';

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	} else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name =
			'Name must be at least 2 characters and less than 30 characters';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is not correctly formatted';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	} else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password =
			'Password must be at least 6 characters and less than 30 characters';
	}

	if (Validator.isEmpty(data.confirmPassword)) {
		errors.confirmPassword = 'Confirm password field is required';
	} else if (!Validator.equals(data.password, data.confirmPassword)) {
		errors.confirmPassword = 'Does not match with your password';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateRegisterInput;
