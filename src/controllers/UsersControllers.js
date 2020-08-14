const express = require ('express');

const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
        const users = await User.find()
    res.send(users)
});



module.exports = app => app.use('/users', router);