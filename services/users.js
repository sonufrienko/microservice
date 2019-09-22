const Debug = require('debug');
const { ObjectID } = require('mongodb');
const mongo = require('../db/mongo');

// const sequelize = require('../db/sequelize');
// const users = await sequelize.Users.findAll();
// const user = await sequelize.Users.create(data);

const getUsers = async () => {
	const debug = Debug('app:api:users');
	debug('getUsers:start');

	const dataFromMongo = await mongo.db
		.collection('users')
		.find({})
		.sort()
		.toArray();

	debug('getUsers:end');

	return dataFromMongo;
};

const getSingleUser = async userId => {
	const debug = Debug('app:api:users');
	debug('getSingleUser:start');
	const user = await mongo.db
		.collection('users')
		.findOne({ _id: new ObjectID(userId) });

	debug('getSingleUser:end');
	return user;
};

const addUser = async data => {
	const debug = Debug('app:api:users');
	debug('add:start');

	const insertResult = await mongo.db.collection('users').insertOne(data);
	const userFromMongo = insertResult.ops[0];
	debug('add:end');

	return userFromMongo;
};

const updateUser = async (userId, data) => {
	const debug = Debug('app:api:users');
	debug('update:start');
	await mongo.db
		.collection('users')
		.updateOne({ _id: new ObjectID(userId) }, { $set: data });
	debug('update:end');
};

const deleteUser = async userId => {
	try {
		const debug = Debug('app:api:users');
		debug('delete:start');
		await mongo.db.collection('users').deleteOne({ _id: new ObjectID(userId) });
		debug('delete:end');
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
