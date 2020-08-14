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

router.put('/update/:id', async (req, res) => {
    await User.findByIdAndUpdate({'_id': req.params.id}, req.body, { new: true})
    .then(response =>{
        return res.status(200).json(response)
    })
    .catch(error =>{
        return res.status(500).json(error);
    });
});

router.get('/show/:id', async (req, res) => {
    await User.findById(req.params.id)
    .then(response => {
        if(response)
        return res.status(200).json(response);

        else
        return res.status(404).json({error: 'Usuario não encontrado'});
    })
    .catch(error => {
        return res.status(500).json(error);
    });
})

router.get('/all/:triggeredBy', async (req,res) =>{
    await User.find({triggeredBy: {'$in': req.params.triggeredBy}})
    .sort('when')
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(error => {
        return res.status(500).json(error);
    });
})

router.delete('/delete/:id', async (req, res) =>{
    await User.deleteOne({'_id': req.params.id})
    .then(response =>{
        return res.status(200).json(response)
    })
    .catch(error =>{
        return res.status(500).json(error);
    });
})

module.exports = app => app.use('/auth', router);