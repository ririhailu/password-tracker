const router = require('express').Router();
const sequelize = require('../config/connection');
const { Passwords } = require('../models');

router.get('/', async (req, res) => {
    Passwords.findAll({
        attributes: ['id', 'username', 'user_id', 'password', 'title', 'initVector', 'securityKey']
    }
    ).then(passwordDB => {
        const password = passwordDB.map(password => password.get({ plain: true }));
        const loggedIn = req.session.logged_in
        res.render('dashboard', {password, loggedIn});
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
    res.render('new');
});

router.post('/new', async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await Passwords.create({
            username: req.body.username,
            title: req.body.title,
            password: req.body.password,
            initVector: req.body.initVector,
            securityKey: req.body.securityKey,
            user_id: 1,
        });
        // const newPassword = await Passwords.create({
        //   ...req.body,
        //   user_id: req.session.user_id,
        // });
    
        res.status(200).json(newPassword);
      } catch (err) {
        res.status(400).json(err);
      }
})

// logoutRouter.get('/', (req, res) => {
//     req.logout();
//     return res.redirect(HOME);
// });

module.exports = router;