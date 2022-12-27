const { Model, DataTypes } = require('sequelize');
const { createHmac } = await import('node:crypto');
const sequelize = require('../config/connection');

class Passwords extends Model {

}

Passwords.init(
    {
        id: {

        },
        password: {

        },
        title: {

        },
        username: {

        },
        initVector: {

        },
        securityKey: {

        },
        user_id: {
            
        }
    }
);

module.exports = Passwords;