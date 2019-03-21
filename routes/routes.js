const users = require('./controllers/users');

module.exports = (fastify, opts, next) => {
	fastify.route({
		method: 'GET',
		url: '/users',
		handler: users.getUsers
	});

	fastify.route({
		method: 'GET',
		url: '/users/:userId',
		handler: users.getSingleUser
	});

	fastify.route({
		method: 'POST',
		url: '/users',
		handler: users.addUser
	});

	fastify.route({
		method: 'PUT',
		url: '/users/:userId',
		handler: users.updateUser
	});

	fastify.route({
		method: 'DELETE',
		url: '/users/:userId',
		handler: users.deleteUser
	});

	next();
};
