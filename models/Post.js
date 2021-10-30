const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const encodeContent = require('../utils/encodeContent');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: 'post',
  }
);

module.exports = Post;