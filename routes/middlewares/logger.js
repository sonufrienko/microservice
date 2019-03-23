const winston = require('winston');

const { LOG_LEVEL, NODE_ENV } = process.env;

winston.configure({
	transports: [
		new winston.transports.Console({
			// Show only errors on test
			level: NODE_ENV === 'test' ? 'error' : LOG_LEVEL,
			handleExceptions: true,
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			)
		})
		// new winston.transports.File({
		// 	level: 'info',
		// 	handleExceptions: true,
		// 	format: winston.format.json(),
		// 	filename: 'logs/server.log'
		// })
	]
});

const logger = (err, req, res, next) => {
	if (err && err.name === 'UnauthorizedError') {
		// log unauthorized requests
		res.status(401).end();
	} else if (err) {
		winston.error(err.stack);
		res.status(500).send({
			error: true,
			message: err.message
		});
	} else {
		res.status(405).end();
	}
};

module.exports = logger;
