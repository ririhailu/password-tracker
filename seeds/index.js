const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPassword = require('./passwordData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUser();

    await seedPassword();

    process.exit(0);
};

seedAll();