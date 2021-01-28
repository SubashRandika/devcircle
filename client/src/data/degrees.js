import sortByProperty from '../utils/sort';

const degreesList = [
	{ value: 'associates', label: "Associate's" },
	{ value: 'bachelors', label: "Bachelor's" },
	{ value: 'graduate', label: 'Graduate' },
	{ value: 'masters', label: "Master's" },
	{ value: 'doctorate', label: 'Doctorate' },
	{ value: 'certificate', label: 'Certificate' },
	{ value: 'diploma', label: 'Diploma' },
	{ value: 'coursework', label: 'Coursework' },
	{ value: 'bootcamp', label: 'Bootcamp' },
	{ value: 'post_graduate', label: 'Post Graduate' },
	{ value: 'college', label: 'College' },
	{ value: 'high_school_diploma', label: 'High School Diploma' },
	{ value: 'professional', label: 'Professional' }
].sort(sortByProperty('label'));

export default degreesList;
