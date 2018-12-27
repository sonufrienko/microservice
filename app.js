import fs from 'fs';
import Fastify from 'fastify';
import routes from './routes';

const { PORT, LOG_LEVEL, SSL_KEY, SSL_CERT } = process.env;

const fastify = Fastify({
	http2: true,
	https: {
		allowHTTP1: true,
		key: fs.readFileSync(SSL_KEY),
		cert: fs.readFileSync(SSL_CERT)
	},
	logger: {
		level: LOG_LEVEL
	}
});

fastify.register(routes);

fastify.listen(PORT, (err, address) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	fastify.log.info(`Server listening on ${address}`);
});
