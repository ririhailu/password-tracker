const { Model, DataTypes } = require('sequelize');
const { createHmac } = import('node:crypto');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model {
    checkPassword(loginPw) {
        console.log(loginPw);
      return bcrypt.compareSync(loginPw, this.user_password);
    }
  }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
              newUserData.user_password = await bcrypt.hash(newUserData.user_password, 10);
              return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
              updatedUserData.user_password = await bcrypt.hash(updatedUserData.user_password, 10);
              return updatedUserData;
            },
          },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',

    }
);

module.exports = User;