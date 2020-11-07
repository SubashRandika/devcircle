const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// database configurations
const db = require('./config/keys').mongoURI;

// connect to mongodb database
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connection established'))
	.catch((err) => console.error(err));

app.get('/status', (req, res) => {
	res.status(200).send({
		health: 'OK',
		message: 'API is up and running'
	});
});

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
