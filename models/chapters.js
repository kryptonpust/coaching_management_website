'use strict';
module.exports = (sequelize, DataTypes) => {
  const chapters = sequelize.define('chapters', {
    title: DataTypes.STRING
  }, {});
  chapters.associate = function(models) {
    // associations can be defined here
  };
  return chapters;
};