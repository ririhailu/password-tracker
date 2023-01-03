const { User } = require('../models');

const userData = [
    {
        user_name: 'User',
        user_password: 'Password',
    },
];

const seedUser = () => User.bulkcreate(userData);

module.exports = seedUser;