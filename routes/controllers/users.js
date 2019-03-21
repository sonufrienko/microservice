const usersService = require('../../services/users');

const getUsers = async ({ params }, res) => usersService.getUsers();

const getSingleUser = async ({ body, params: { userId } }, res) =>
	usersService.getSingleUser(userId);

const addUser = async ({ body }, res) => usersService.addUser(body);

const updateUser = async ({ body, params: { userId } }, res) =>
	usersService.updateUser(userId, body);

const deleteUser = async ({ body, params: { userId } }, res) => {
	const success = await usersService.deleteUser(userId);
	return success;
};

module.exports = {
	getUsers,
	getSingleUser,
	addUser,
	updateUser,
	deleteUser
};
