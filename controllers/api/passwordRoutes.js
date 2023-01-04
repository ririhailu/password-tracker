const router = require('express').Router();
const { User, Passwords } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const passwordData = await Passwords.findAll();
        res.status(200).json(passwordData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const passwordData = await Passwords.findByPk(req.params.id, {
            include: [{ model: User, through: Passwords, as: 'user_passwords'}]
        });

        if (!passwordData) {
            res.status(404).json({ message: 'No password found with this id.'});
            return;
        }

        res.status(200).json(passwordData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try{
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
})



module.exports = router;