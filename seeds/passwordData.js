const { Passwords } = require('../models');

const passwordData = [
    {
        password: 'test1',
        title: 'test2',
        username: 'test3',
        initVector:'crypto.randomBytes(16)',
        securityKey: 'crypto.randomBytes(32)',
        user_id: '1',
    },
];

const seedPassword = () => Passwords.bulkCreate(passwordData);

module.exports = seedPassword;