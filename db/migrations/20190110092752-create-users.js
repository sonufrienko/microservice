module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		}),

	down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
