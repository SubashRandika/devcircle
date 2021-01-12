const sortByProperty = (prop, isAsc = true) => {
	return (a, b) => {
		if (isAsc) {
			return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
		} else {
			return a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : 0;
		}
	};
};

export default sortByProperty;
