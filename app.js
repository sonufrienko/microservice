const http = require('http');
const app = require('express')();
const compression = require('compression');
const bodyParser = require('body-parser');
const winston = require('winston');

const authorization = require('./routes/middlewares/authorization');
const logger = require('./routes/middlewares/logger');
const routes = require('./routes/routes');

// Enable KeepAlive to speed up HTTP requests to another microservices
http.globalAgent.keepAlive = true;

const { PORT } = process.env;

app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.status(200).send('ok'));
app.use(authorization);
app.use('/v1', routes);
app.use(logger);

const server = app.listen(PORT, () => {
	const serverAddress = server.address();
	winston.info(`Server listening on http://localhost:${serverAddress.port}`);
});

module.exports = server;
