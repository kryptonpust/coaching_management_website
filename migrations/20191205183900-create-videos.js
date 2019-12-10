'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapterid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "chapters",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      title: {
        type: Sequelize.STRING
      },
      file: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('videos');
  }
};