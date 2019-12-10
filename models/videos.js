'use strict';
module.exports = (sequelize, DataTypes) => {
  const videos = sequelize.define('videos', {
    chapterid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    file: DataTypes.STRING
  }, {});
  videos.associate = function(models) {
    // associations can be defined here
  };
  return videos;
};