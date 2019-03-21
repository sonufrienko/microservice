const Fastify = require('fastify');

const fastify = Fastify({
	logger: {
		level: process.env.LOG_LEVEL
	}
});

module.exports = fastify.log;
