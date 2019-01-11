module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		id: {
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: () => new Date()
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: () => new Date()
		}
	});

	return Users;
};
