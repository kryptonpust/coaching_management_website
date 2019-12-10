'use strict';
module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: DataTypes.STRING,
    page: DataTypes.TEXT,
  }, {});
  Documents.associate = function(models) {
    // associations can be defined here
  };
  return Documents;
};