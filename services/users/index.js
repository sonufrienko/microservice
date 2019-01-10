import Debug from 'debug';
import { db, ObjectID } from '../../db/mongo';

export const getUsers = async ({ params }, res) => {
	const debug = Debug('getUsers');
	const items = await db
		.collection('users')
		.find({})
		.sort()
		.toArray();
	const data = { items };
	debug('fetch');
	// modifications
	debug('modifications');
	// filter data
	debug('filter');
	// sort data
	debug('sort');
	return data;
};

export const getSingleUser = async ({ body, params: { userId } }, res) => {
	const user = await db
		.collection('users')
		.findOne({ _id: new ObjectID(userId) });

	return user;
};

export const addUser = async ({ body }, res) => {
	const insertResult = await db.collection('users').insertOne(body);
	const user = insertResult.ops[0];
	return user;
};

export const updateUser = async ({ body, params: { userId } }, res) => {
	await db
		.collection('users')
		.updateOne({ _id: new ObjectID(userId) }, { $set: body });

	res.send(undefined);
};

export const deleteUser = async ({ body, params: { userId } }, res) => {
	await db.collection('users').deleteOne({ _id: new ObjectID(userId) });
	res.send(undefined);
};
