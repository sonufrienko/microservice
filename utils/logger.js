const winston = require('winston');

winston.configure({
	transports: [
		new winston.transports.Console({
			level: 'debug',
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

const responseWithError = (err, req, res, next) => {
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

module.exports = {
	responseWithError
};
