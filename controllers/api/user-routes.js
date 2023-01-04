const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

function requireLogin(req, res, next) {
  if (!req.session.logged_in) {
    res.status(401).json({ message: 'You must be logged in to access this route' });
  } else {
    next();
  }
}

User.prototype.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

router.post('/', async (req, res) => {
    try{
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body.userName);
    // console.log(req.body.password);
    // try {
    //     const userData = await User.findOne({ where: { user_name: req.body.userName }});
    //     // console.log(userData);
    //     if (!userData) {
    //         console.log("Hello World");
    //         res
    //             .status(400)
    //             .json({ message: 'Incorrect username or password!' });
    //         return;
    //     }
    //     // console.log(userData);
    //     console.log(req.body.password);
    //     const validPassword = await userData.isValidPassword(req.body.password);
    //     console.log(validPassword);
    //     if (validPassword) {
    //         console.log("boop");
    //     }
    //     console.log(validPassword);
    //     if (!validPassword) {
    //         console.log("Hi");
    //         res
    //             .status(400)
    //             .json({ message: 'Incorrect email or password!' });
    //         return;
    //     }
    //     req.session.save(() => {
    //         req.session.user_id = userData.id;
    //         req.session.logged_in  = true;
    //         res.json({ user: userData, message: 'You successfully logged in!'})
    //     });
    // } 
    // catch (err) {
    //     res.status(400).json(err);
    // }
    try {
        const userData = await User.findOne({ where: { user_name: req.body.userName } });
        
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
        
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.json({ user: userData, message: 'You are now logged in!' });
        });
    
      } catch (err) {
        res.status(400).json(err);
      }

});

module.exports = router;