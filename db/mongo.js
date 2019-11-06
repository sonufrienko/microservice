const { MongoClient } = require('mongodb');
const winston = require('winston');

const RECONNECT_INTERVAL = 1000;
const CONNECT_OPTIONS = {
	reconnectTries: 60 * 60 * 24,
	reconnectInterval: RECONNECT_INTERVAL,
	useNewUrlParser: true,
	useUnifiedTopology: true
};

const mongo = {};

const composeConnectionUrl = env => {
	const {
		MONGO_USER = '',
		MONGO_PASS = '',
		MONGO_HOST = '',
		MONGO_PORT = 27017,
		MONGO_DB = ''
	} = env;

	const credentials =
		MONGO_USER.length || MONGO_PASS.length
			? `${MONGO_USER}:${MONGO_PASS}@`
			: '';

	return `mongodb://${credentials}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
};

const connectionUrlIsCorrect = uri => uri && uri.includes('mongodb://');

const getConnectionUrl = env => {
	const { MONGO_URL } = env;
	const dbUrl = connectionUrlIsCorrect(MONGO_URL)
		? MONGO_URL
		: composeConnectionUrl(env);
	return dbUrl;
};

const getDBNameFromUri = uri => uri.slice(uri.lastIndexOf('/') + 1);

const connectAsync = ({ uri, options }) =>
	new Promise((resolve, reject) => {
		MongoClient.connect(uri, options, (err, client) =>
			err ? reject(err) : resolve(client)
		);
	});

const connectWithRetry = async () => {
	const uri = getConnectionUrl(process.env);
	const dbName = getDBNameFromUri(uri);
	try {
		const client = await connectAsync({
			uri,
			options: CONNECT_OPTIONS
		});
		mongo.db = client.db(dbName);
		mongo.db.on('close', () => {
			winston.warn('MongoDB connection was closed');
			connectWithRetry();
		});
		mongo.db.on('reconnect', () => {
			winston.warn('MongoDB reconnected');
		});
		winston.info(`MongoDB connected successfully. Database: ${dbName}.`);
	} catch (error) {
		winston.error(
			`MongoDB connection was failed: ${error.message}`,
			error.message
		);
		setTimeout(connectWithRetry, RECONNECT_INTERVAL);
	}
};

const isConnected = () =>
	(mongo && mongo.db && mongo.db.topology && mongo.db.topology.isConnected()) ||
	false;

mongo.connectWithRetry = connectWithRetry;
mongo.isConnected = isConnected;

module.exports = mongo;
