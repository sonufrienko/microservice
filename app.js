const Fastify = require('fastify');
const routes = require('./routes/routes');

const { PORT, LOG_LEVEL } = process.env;

const fastify = Fastify({
	logger: {
		level: LOG_LEVEL
	}
});

fastify.register(routes, { prefix: '/v1' });

fastify.listen(PORT, (err, address) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	fastify.log.info(`Server listening on ${address}`);
});

module.exports = fastify;
