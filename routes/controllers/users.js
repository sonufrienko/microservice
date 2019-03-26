const { celebrate, Joi } = require('celebrate');
const usersService = require('../../services/users');

const getUsers = async ({ params }, res) => {
	const users = await usersService.getUsers();
	res.status(200).send(users);
};

const getSingleUser = async ({ body, params: { userId } }, res) => {
	const user = await usersService.getSingleUser(userId);
	res.status(200).send(user);
};

const getSingleUserValidation = celebrate({
	params: {
		userId: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/)
			.required()
	}
});

const addUser = async ({ body }, res) => {
	const user = await usersService.addUser(body);
	res.status(200).send(user);
};

const addUserValidation = celebrate({
	body: {
		email: Joi.string()
			.email()
			.required()
	}
});

const updateUser = async ({ body, params: { userId } }, res) => {
	await usersService.updateUser(userId, body);
	res.status(200).end();
};

const deleteUser = async ({ body, params: { userId } }, res) => {
	const success = await usersService.deleteUser(userId);
	res.status(success ? 200 : 400).end();
};

module.exports = {
	getUsers,
	getSingleUser,
	getSingleUserValidation,
	addUser,
	addUserValidation,
	updateUser,
	deleteUser
};
