const router = require('express').Router();
const sequelize = require('../config/connection');
const { Password } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    Password.findAll({
        attributes: ['id', 'username', 'user_id', 'password', 'title', 'initVector', 'securityKey']
    }
    ).then(passwordDB => {
        console.log(passwordDB);
        const password = passwordDB.map(password => password.get({ plain: true }));

        res.render('dashboard', { password, admin: req.session.admin });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
    res.render('new-post');
});


logoutRouter.get('/', (req, res) => {
    req.logout();
    return res.redirect(HOME);
});




module.exports = router;