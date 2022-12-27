const { Model, DataTypes } = require('sequelize');
const { createHmac } = await import('node:crypto');
const sequelize = require('../config/connection');

class User extends Model {

}

User.init(
    {
        id: {

        },
        user_name: {

        },
        user_password: {

        }
    }
);

module.exports = User;