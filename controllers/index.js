const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const apiRoutes = require('./api')
// const passwordRoutes = require('./passwordRoutes');
// const userRoutes = require('./userRoutes');



router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('/password', passwordRoutes);
// router.use('/user', userRoutes);

module.exports = router;


