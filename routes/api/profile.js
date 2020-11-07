const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send({
		message: 'Profile works'
	});
});

module.exports = router;
