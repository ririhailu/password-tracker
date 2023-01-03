const { Passwords } = require('../models');

const passwordData = [
    {

    }
];

const seedPassword = () => Passwords.bulkcreate(passwordData);

module.exports = seedPassword;