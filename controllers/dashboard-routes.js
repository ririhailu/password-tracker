const router = require('express').Router();
const sequelize = require('../config/connection');
const { Passwords } = require('../models');
const crypto = require('crypto');

router.get('/', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    } else {
        Passwords.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'username', 'user_id', 'password', 'title', 'initVector', 'securityKey']
        }
        ).then(passwordDB => {
            const password = passwordDB.map(password => password.get({ plain: true }));
            const loggedIn = req.session.logged_in
            res.render('dashboard', { password, loggedIn });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

router.get('/new', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    } else {
        res.render('new');
    }
});

router.get('/update', (req, res) => {
    res.render('update');
});

router.post('/new', async (req, res) => {
    const algorithm = "aes-256-cbc";
    // generate 16 bytes of random data
    const initVector = crypto.randomBytes(16);
    // protected data
    const message = req.body.password;
    // secret key generate 32 bytes of random data
    const securityKey = crypto.randomBytes(32);
    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    try {
        const newPassword = await Passwords.create({
            username: req.body.username,
            title: req.body.title,
            password: encryptedData,
            initVector: initVector.toString('hex'),
            securityKey: securityKey.toString('hex'),
            user_id: req.session.user_id,
        });
        // const newPassword = await Passwords.create({
        //   ...req.body,
        //   user_id: req.session.user_id,
        // });

        res.status(200).json(newPassword);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/copy/:id', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    } else {
        Passwords.findAll({
            where: { user_id: req.session.user_id, id: req.params.id },
            attributes: ['id', 'username', 'user_id', 'password', 'title', 'initVector', 'securityKey']
        }
        ).then(passwordDB => {
            const password = passwordDB.map(password => password.get({ plain: true }));
            const securityKey = Buffer.from(password[0].securityKey, 'hex');
            const initVector = Buffer.from(password[0].initVector, 'hex');
            const encryptedData = password[0].password;
            const algorithm = "aes-256-cbc";
            // the decipher function
            const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
            let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
            decryptedData += decipher.final("utf8");
            res.json(decryptedData)
        })
    }
});

module.exports = router;