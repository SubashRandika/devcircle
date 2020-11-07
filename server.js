const express = require('express');
const mongoose = require('mongoose');

const app = express();

// database configurations
const db = require('./config/keys').mongoURI;

// connect to mongodb database
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connection established'))
	.catch((err) => console.error(err));

app.get('/', (req, res) => {
	res.send('Hello World');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
