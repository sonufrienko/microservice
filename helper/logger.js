import Fastify from 'fastify';

const fastify = Fastify({
	logger: {
		level: process.env.LOG_LEVEL
	}
});

export default fastify.log;
