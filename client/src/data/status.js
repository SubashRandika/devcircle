import sortByProperty from '../utils/sort';

const statusList = [
	{ value: 'developer', label: 'Developer' },
	{ value: 'junior_developer', label: 'Junior Developer' },
	{ value: 'senior_developer', label: 'Senior Developer' },
	{ value: 'front_end_developer', label: 'Front-End Developer' },
	{ value: 'back_end_developer', label: 'Back-End Developer' },
	{ value: 'full_stack_developer', label: 'Full-Stack Developer' },
	{ value: 'associate_lead', label: 'Associate Technical Lead' },
	{ value: 'lead', label: 'Technical Lead' },
	{ value: 'senior_lead', label: 'Senior Technical Lead' },
	{ value: 'associate_architect', label: 'Associate Architect' },
	{ value: 'architect', label: 'Architect' },
	{ value: 'senior_architect', label: 'Senior Architect' },
	{ value: 'intern', label: 'Intern' },
	{ value: 'student_or_learning', label: 'Student or Learning' },
	{ value: 'instructor_or_teacher', label: 'Instructor or Teacher' },
	{ value: 'other', label: 'Other' }
].sort(sortByProperty('label'));

export default statusList;
