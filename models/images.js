'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    sessionid: DataTypes.INTEGER,
    link: DataTypes.STRING
  }, {});
  images.associate = function(models) {
    // associations can be defined here
  };
  return images;
};