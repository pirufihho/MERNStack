const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/login/:userName/:password', async (req,res) => {
    const user = await User.where({userName: req.params.userName, password:req.params.password}).findOne();
    if(user){
        res.json({loggedIn: true,adminUser:user.adminUser});
    } else {
        res.json({loggedIn: false});
    }
})

router.get('/', async (req,res) => {
    const users = await User.find();
    res.json(users);
})

router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
})

router.post('/', async (req,res) => {
    const {name,lastName,userName,password,adminUser} = req.body
    const user = new User ({
        name: name,
        lastName: lastName,
        userName: userName,
        password: password,
        adminUser:adminUser
    })
    await user.save();
    res.json({status:'User saved'});
})

router.put('/:id', async (req, res) => {
    const {name,lastName,userName,password,adminUser} = req.body;
    const newUser = {name,lastName,userName,password,adminUser};
    await User.findByIdAndUpdate(req.params.id,newUser);
    res.json({status: 'User updated'})
})

router.delete('/:id', async (req,res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'User removed'});
})


module.exports = router;