const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3050;

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}🚀`);
});
