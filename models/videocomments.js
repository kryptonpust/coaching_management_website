'use strict';
module.exports = (sequelize, DataTypes) => {
  const videocomments = sequelize.define('videocomments', {
    videoid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {});
  videocomments.associate = function(models) {
    // associations can be defined here
  };
  return videocomments;
};