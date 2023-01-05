const router = require('express').Router();
const sequelize = require('../config/connection');
const { Passwords } = require('../models');
const crypto = require('crypto');

router.get('/', async (req, res) => {
    Passwords.findAll({
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
});

router.get('/new', (req, res) => {
    res.render('new');
});

router.post('/new', async (req, res) => {
    console.log(req.body);

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

    console.log("Encrypted message: " + encryptedData);

    // the decipher function
    // const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);

    // let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

    // decryptedData += decipher.final("utf8");

    // console.log("Decrypted message: " + decryptedData);

    try {
        const newPassword = await Passwords.create({
            username: req.body.username,
            title: req.body.title,
            password: encryptedData,
            initVector: JSON.stringify(initVector),
            securityKey: JSON.stringify(securityKey),
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