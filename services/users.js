const Debug = require('debug');
const { ObjectID } = require('mongodb');
const mongo = require('../db/mongo');
const sequelize = require('../db/sequelize');

const getUsers = async () => {
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

const getSingleUser = async userId => {
	const user = await mongo.db
		.collection('users')
		.findOne({ _id: new ObjectID(userId) });

	return user;
};

const addUser = async data => {
	const debug = Debug('addUser');
	debug('begin');

	const userFromPostgres = await sequelize.Users.create(data);
	debug('data from Postgres');

	const insertResult = await mongo.db.collection('users').insertOne(data);
	const userFromMongo = insertResult.ops[0];
	debug('data from MongoDB');

	return { userFromPostgres, userFromMongo };
};

const updateUser = async (userId, data) => {
	await mongo.db
		.collection('users')
		.updateOne({ _id: new ObjectID(userId) }, { $set: data });
};

const deleteUser = async userId => {
	try {
		await mongo.db.collection('users').deleteOne({ _id: new ObjectID(userId) });
		return true;
	} catch (e) {
		return false;
	}
};

module.exports = {
	getUsers,
	getSingleUser,
	addUser,
	updateUser,
	deleteUser
};
