'use strict';
module.exports = (sequelize, DataTypes) => {
  const linkCatagories = sequelize.define('linkCatagories', {
    title: DataTypes.STRING
  }, {});
  linkCatagories.associate = function(models) {
    // associations can be defined here
  };
  return linkCatagories;
};