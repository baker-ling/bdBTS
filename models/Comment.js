const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const encodeContent = require('../utils/encodeContent');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: encodeContent,
      beforeUpdate: encodeContent 
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;