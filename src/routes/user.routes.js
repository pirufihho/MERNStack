const express = require('express');
const { IgnorePlugin } = require('webpack');
const router = express.Router();
const User = require('../models/user')

const jwt = require('jsonwebtoken');
const secret = 'secret-key';

// router.get('/login/:userName/:password', async (req,res) => {
//     const user = await User.where({userName: req.params.userName, password:req.params.password}).findOne();
//     if(user){
//         res.json({loggedIn: true,adminUser:user.adminUser,userId:user._id});
//     } else {
//         res.json({loggedIn: false});
//     }
// })

router.get('/login/:userName/:password', async (req, res) => {
    const user = await User.where({userName: req.params.userName, password: req.params.password}).findOne();
    if (user) {
        const payload = {
            userId: user._id,
            adminUser: user.adminUser,
            userName: user.userName
        };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.json({loggedIn: true,adminUser:user.adminUser,userId:user._id, jwt:token});
    } else {
        res.json({loggedIn: false});
    }
});

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

    var getUser = await User.where({userName:user.userName}).findOne();
    if(getUser){
        res.json({status:'User already exists',isSaved: false})
    } else {

        await user.save();
        res.json({status:'User saved',isSaved: true});
    }

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