const express = require('express');
const app = express();
const moment = require('moment');

const PORT = 3000 || process.env.PORT;

app.get('/', (req, res) => {
	res.status(200).send('Hello World');
});

app.get('/api/v1/instagram', (req, res) => {
	const objectData = {
		name: 'ayan',
		followers: 900,
		follows: 300,
		date: moment().format('MMMM Do YYYY, h:mm:ss A', new Date()),
	};

	res.status(200).json(objectData);
});
app.get('/api/v1/facebook', (req, res) => {
	const objectData = {
		name: 'ayan',
		followers: 900,
		follows: 300,
		date: new Date(),
	};

	res.status(200).json(objectData);
});
app.get('/api/v1/linkedin', (req, res) => {
	const objectData = {
		name: 'ayan',
		followers: 900,
		follows: 300,
		date: new Date(),
	};

	res.status(200).json(objectData);
});

app.get('/api/v1/:great', (req, res) => {
	res.status(200).send(req.params.great);
});

app.listen(PORT, () => {
	console.log(`Server is live on ${PORT}🚀`);
});
