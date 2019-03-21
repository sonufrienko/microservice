const usersRoutes = require('./users');

module.exports = (fastify, opts, next) => {
	usersRoutes.forEach(route => fastify.route(route));
	next();
};
