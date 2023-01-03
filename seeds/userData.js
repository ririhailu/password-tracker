const { User } = require('../models');

const userData = [
    {

    }
];

const seedUser = () => User.bulkcreate(userData);

module.exports = seedUser;