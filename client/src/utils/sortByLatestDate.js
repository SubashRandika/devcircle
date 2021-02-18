const sortByLatestDate = (collection) => {
	return collection.sort(
		(col1, col2) => new Date(col2.from) - new Date(col1.from)
	);
};

export default sortByLatestDate;
