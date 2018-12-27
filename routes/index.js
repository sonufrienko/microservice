import usersRoutes from './users';

export default (fastify, opts, next) => {
	usersRoutes.forEach(route => fastify.route(route));
	next();
};
