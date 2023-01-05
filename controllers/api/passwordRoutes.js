const router = require('express').Router();
const { User, Passwords } = require('../../models')

router.get('/', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    } else {
        try {
            const passwordData = await Passwords.findAll();
            res.status(200).json(passwordData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

router.get('/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    } else {
        try {
            const passwordData = await Passwords.findByPk(req.params.id, {
                include: [{ model: User, through: Passwords, as: 'user_passwords' }]
            });

            if (!passwordData) {
                res.status(404).json({ message: 'No password found with this id.' });
                return;
            }

            res.status(200).json(passwordData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

router.delete('/:id', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    } else {
        try {
            const passwordData = await Passwords.destroy({
                where: {
                    id: req.params.id
                }
            });

            if (!passwordData) {
                res.status(404).json({ message: 'No Password found with this id.' });
                return;

            }

            res.status(200).json(passwordData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

router.put('/:id', async (req, res) => {
    console.log('update route');
    console.log(req.params.id);
    
    Passwords.update(
        {
            where: {
              id: req.params.id,
            },
        },
        {
          password: req.body.password,
          title: req.body.title,
          username: req.body.username,
        }
        
      )
        .then((updatedPassword) => {
          // Sends the updated book as a json response
          res.json(updatedPassword);
        })
        .catch((err) => res.json(err));
});

module.exports = router;