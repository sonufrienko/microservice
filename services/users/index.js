const Debug = require('debug');
const { ObjectID } = require('mongodb');
const mongo = require('../../db/mongo');
const sequelize = require('../../db/sequelize');

const getUsers = async ({ params }, res) => {
	const debug = Debug('getUsers');
	debug('begin');

	const dataFromPostgres = await sequelize.Users.findAll();
	debug('data from Postgres');

	const dataFromMongo = await mongo.db
		.collection('users')
		.find({})
		.sort()
		.toArray();
	debug('data from MongoDB');

	return [...dataFromPostgres, ...dataFromMongo];
};

const getSingleUser = async ({ body, params: { userId } }, res) => {
	const user = await mongo.db
		.collection('users')
		.findOne({ _id: new ObjectID(userId) });

	return user;
};

const addUser = async ({ body }, res) => {
	const debug = Debug('addUser');
	debug('begin');

	const userFromPostgres = await sequelize.Users.create(body);
	debug('data from Postgres');

	const insertResult = await mongo.db.collection('users').insertOne(body);
	const userFromMongo = insertResult.ops[0];
	debug('data from MongoDB');

	return { userFromPostgres, userFromMongo };
};

const updateUser = async ({ body, params: { userId } }, res) => {
	await mongo.db
		.collection('users')
		.updateOne({ _id: new ObjectID(userId) }, { $set: body });

	res.send(undefined);
};

const deleteUser = async ({ body, params: { userId } }, res) => {
	await mongo.db.collection('users').deleteOne({ _id: new ObjectID(userId) });
	res.send(undefined);
};

module.exports = {
	getUsers,
	getSingleUser,
	addUser,
	updateUser,
	deleteUser
};
