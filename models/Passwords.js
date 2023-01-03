const { Model, DataTypes } = require('sequelize');
const { createHmac } = import('node:crypto');
const sequelize = require('../config/connection');

class Passwords extends Model {

}

Passwords.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        password: {
        type: DataTypes.STRING,
        allowNull:false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        initVector: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        securityKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Passwords',
      }
);

module.exports = Passwords;