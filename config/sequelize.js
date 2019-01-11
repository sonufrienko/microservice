require('dotenv').config();

module.exports = {
	test: {
		dialect: 'sqlite',
		storage: ':memory:'
	},
	development: {
		username: process.env.SQL_USER,
		password: process.env.SQL_PASS,
		database: process.env.SQL_DB,
		host: process.env.SQL_HOST,
		port: process.env.SQL_PORT,
		dialect: process.env.SQL_DIALECT,
		operatorsAliases: false,
		pool: {
			max: 5,
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
		host: process.env.SQL_HOST,
		port: process.env.SQL_PORT,
		dialect: process.env.SQL_DIALECT,
		operatorsAliases: false,
		logging: false,
		pool: {
			max: 100,
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
