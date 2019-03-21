const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configFile = require('../config/sequelize');

const env =
	process.env.NODE_ENV === 'production' ? 'production' : 'development';
const config = configFile[env];
const db = {};
const sequelize = new Sequelize(config);
const modelsPath = path.join(__dirname, './models/');

fs.readdirSync(modelsPath)
	.filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
	.forEach(file => {
		const model = sequelize.import(path.join(modelsPath, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
