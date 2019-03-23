require('dotenv').config();

module.exports = {
	development: {
		username: process.env.SQL_USER,
		password: process.env.SQL_PASS,
		database: process.env.SQL_DB,
		host: process.env.SQL_HOST,
		port: process.env.SQL_PORT,
		dialect: process.env.SQL_DIALECT,
		logging: false,
		pool: {
			max: Number(process.env.SQL_POOL_LIMIT),
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		define: {
			freezeTableName: true,
			timestamps: false
		}
	},
	production: {
		username: process.env.SQL_USER,
		password: process.env.SQL_PASS,
		database: process.env.SQL_DB,
		port: process.env.SQL_PORT,
		dialect: process.env.SQL_DIALECT,
		logging: false,
		replication: {
			read: [{ host: process.env.SQL_HOST_READ }],
			write: { host: process.env.SQL_HOST_WRITE }
		},
		pool: {
			max: Number(process.env.SQL_POOL_LIMIT),
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		define: {
			freezeTableName: true,
			timestamps: false
		}
	}
};
