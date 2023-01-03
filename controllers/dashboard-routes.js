const router = require('express').Router();
const sequelize = require('../config/connection');
const { Passwords } = require('../models');

router.get('/', async (req, res) => {
    console.log(req.session);
    Passwords.findAll({
        attributes: ['id', 'username', 'user_id', 'password', 'title', 'initVector', 'securityKey']
    }
    ).then(passwordDB => {
        console.log(passwordDB);
        const password = passwordDB.map(password => password.get({ plain: true }));
        console.log(password);
        // admin: req.session.admin
        res.render('dashboard', {password});
        // res.send(password);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
    res.render('new-post');
});


// logoutRouter.get('/', (req, res) => {
//     req.logout();
//     return res.redirect(HOME);
// });




module.exports = router;