const router = require('express').Router();
const sequelize = require('../config/connection');
const { Passwords } = require('../models');
const { User } = require('../models');


router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  } else {
    res.redirect('/login');
  }
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
    res.redirect('/dashboard');
    return;
  } else {
    res.render('login');
  }
});

// sign up input
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  } else {
    res.render('signup');
  }
});

// create user
router.post('/createuser', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }

// // Signup
// router.get('/signup', async (req, res) => {
//   res.render('signup');
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_name = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }


  // if (req.session.loggedIn) {
  //   res.redirect('/dashboard');
  //   return;
  // } else {
  //   res.render('signup');
  // }
});



module.exports = router;