const { User } = require('../models');

const userData = [
    {
        user_name: 'User',
        user_password: 'Password',
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;