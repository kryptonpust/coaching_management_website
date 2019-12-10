'use strict';
module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define('notes', {
    chapterid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    file: DataTypes.STRING
  }, {});
  notes.associate = function(models) {
    // associations can be defined here
  };
  return notes;
};