const express = require('express');
const router = express.Router();
const Favorite = require('../models/user')

router.get('/byId/:userId/', async (req,res) => {
    const favorites = await Favorite.where({userId: req.params.userId}).find();
    if(favorites){
        res.json(favorites);
    } else {
        res.json({});
    }
})


router.post('/', async (req,res) => {
    const {userId,cabaniaId} = req.body
    const favorite = new Favorite ({
        userId: userId,
        cabaniaId: cabaniaId,
    })
    await favorite.save();
    res.json({status:'Favorite saved'});
})


router.delete('/:id', async (req,res) => {
    await Favorite.findByIdAndRemove(req.params.id);
    res.json({status: 'Favorite removed'});
})


module.exports = router;