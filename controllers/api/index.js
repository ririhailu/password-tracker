const router = require('express').Router();
const userRoutes = require('./user-routes');
const userPasswords = require('./passwordRoutes');

router.use('/users', userRoutes);
router.use('/passwords', userPasswords)

module.exports = router;