import url from 'url';
import { MongoClient } from 'mongodb';
import logger from '../utils/logger';

export { ObjectID } from 'mongodb';
const mongo = {};

const getConnectionUrl = () => {
	const dbCred =
		process.env.MONGO_USER.length > 0 || process.env.MONGO_PASS.length > 0
			? `${process.env.MONGO_USER}:${process.env.MONGO_PASS}@`
			: '';
	const dbUrl =
		process.env.MONGO_URL ||
		`mongodb://${dbCred}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${
			process.env.MONGO_DB
		}`;
	return dbUrl;
};

const RECONNECT_INTERVAL = 1000;
const CONNECT_OPTIONS = {
	reconnectTries: 3600,
	reconnectInterval: RECONNECT_INTERVAL,
	useNewUrlParser: true
};

const connectWithRetry = () => {
	const mongodbConnection = getConnectionUrl();
	const mongoPathName = url.parse(mongodbConnection).pathname;
	const dbName = mongoPathName.substring(mongoPathName.lastIndexOf('/') + 1);

	MongoClient.connect(
		mongodbConnection,
		CONNECT_OPTIONS,
		(err, client) => {
			if (err) {
				logger.error(
					`MongoDB connection was failed: ${err.message}`,
					err.message
				);
				setTimeout(connectWithRetry, RECONNECT_INTERVAL);
			} else {
				mongo.db = client.db(dbName);
				mongo.db.on('close', () => {
					logger.info('MongoDB connection was closed');
					connectWithRetry();
				});
				mongo.db.on('reconnect', () => {
					logger.warn('MongoDB reconnected');
				});
				logger.info(`MongoDB connected successfully. Database: ${dbName}.`);
			}
		}
	);
};

connectWithRetry();

export default mongo;
