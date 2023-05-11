const express = require('express');
require('dotenv').config();
const app = express();

const { PORT } = process.env || 3090;

// middleware
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.post('/order', async (req, res) => {
	const { amount, currency } = req.body;

	var instance = new Razorpay({
		key_id: 'YOUR_KEY_ID',
		key_secret: 'YOUR_SECRET',
	});

	const myOrder = await instance.orders.create({
		amount: amount * 100,
		currency: 'INR',
		receipt: 'receipt#1',
		notes: {
			key1: 'value3',
			key2: 'value2',
		},
	});

	res.status(200).send({
		success: true,
		amount,
		order: myOrder,
	});
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}🚀`));
