const http = require('http');
const app = require('express')();
const bodyParser = require('body-parser');
const winston = require('winston');

const logger = require('./utils/logger');
const routes = require('./routes/routes');

// Enable KeepAlive to speed up HTTP requests to another microservices
http.globalAgent.keepAlive = true;

const { PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', routes);
app.use(logger.responseWithError);

const server = app.listen(PORT, () => {
	const serverAddress = server.address();
	winston.info(`Server listening on http://localhost:${serverAddress.port}`);
});

module.exports = server;
