import Debug from 'debug';

export const getUsers = async (req, res) => {
	const debug = Debug('getUsers');
	const data = { items: [] };
	debug('fetch');
	// modifications
	debug('modifications');
	// filter data
	debug('filter');
	// sort data
	debug('sort');
	return data;
};

export const getSingleUser = async (req, res) => {
	const userId = req.params.userId;

	const user = { id: userId, name: 'Sergey Onufrienko', age: 33 };
	return user;
};

export const addUser = async (req, res) => {
	const user = { name: 'Sergey Onufrienko', age: 33 };
	return user;
};
