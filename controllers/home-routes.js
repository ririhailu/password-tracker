const router = require('express').Router();
const sequelize = require('../config/connection');


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/username', (req, res) => {
    res.render('username');
});


router.get('/password', (req, res) => {
    res.render('password');
});

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  // Signup
  router.get('/signup', (req, res) => {
   if (req.session.loggedIn) {
      res.redirect('/');
     return;
    }
     res.render('signup');
   })
   

 
module.exports = router;