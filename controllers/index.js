const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
// const passwordRoutes = require('./passwordRoutes');
// const userRoutes = require('./userRoutes');



router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('/password', passwordRoutes);
// router.use('/user', userRoutes);



router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;


