const express = require ('express');

const User = require('../models/User');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/register', async (req, res) => {
    try{
    const user = await User.create(req.body);
        console.log(req.body);

        return res.send(user);
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

module.exports = app => app.use('/auth', router);