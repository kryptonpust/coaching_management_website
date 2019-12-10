'use strict';
module.exports = (sequelize, DataTypes) => {
  const featureimages = sequelize.define('featureimages', {
    src: DataTypes.STRING
  }, {});
  featureimages.associate = function(models) {
    // associations can be defined here
  };
  return featureimages;
};