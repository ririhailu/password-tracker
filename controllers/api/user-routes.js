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
        const userData = await User.create({
          user_name: req.body.userName,
          user_password: req.body.password
        });
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

router.post('/logout', async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end()
  }
} )

module.exports = router;