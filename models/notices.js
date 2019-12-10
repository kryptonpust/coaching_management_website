'use strict';
module.exports = (sequelize, DataTypes) => {
  const notices = sequelize.define('notices', {
    title: DataTypes.STRING,
    file: DataTypes.STRING
  }, {});
  notices.associate = function(models) {
    // associations can be defined here
  };
  return notices;
};