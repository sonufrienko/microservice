const Debug = require('debug');
const { ObjectID } = require('mongodb');
const mongo = require('../db/mongo');

// const sequelize = require('../db/sequelize');
// const users = await sequelize.Users.findAll();
// const user = await sequelize.Users.create(data);

const getUsers = async () => {
	const debug = Debug('getUsers');
	debug('begin');

	const dataFromMongo = await mongo.db
		.collection('users')
		.find({})
		.sort()
		.toArray();
	debug('data from MongoDB');

	return dataFromMongo;
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

	const insertResult = await mongo.db.collection('users').insertOne(data);
	const userFromMongo = insertResult.ops[0];
	debug('data from MongoDB');

	return userFromMongo;
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
