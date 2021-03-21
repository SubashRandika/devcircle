const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

require('dotenv').config();
const app = express();

// use body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = process.env.MONGO_DB_URI;

// connect to mongodb database
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log('MongoDB connection established'))
	.catch((err) => console.error(err));

// use passport middleware
app.use(passport.initialize());

// passport configurations
require('./config/passport')(passport);

// use main routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'));

	// if anything other than above route will serve front-end build index.html file
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
