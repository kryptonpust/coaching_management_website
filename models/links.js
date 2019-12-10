'use strict';
module.exports = (sequelize, DataTypes) => {
  const links = sequelize.define('links', {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    catagoryid: DataTypes.INTEGER
  }, {});
  links.associate = function(models) {
    // associations can be defined here
  };
  return links;
};