const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite')
const secret = 'secret-key';
const jwt = require('jsonwebtoken');

router.get('/byId/:userId/', async (req,res) => {
    const favorites = await Favorite.where({userId: req.params.userId}).find();
    if(favorites){
        res.json(favorites);
    } else {
        res.json({});
    }
})


router.post('/',authenticateToken, async (req,res) => {
    const {userId,cabaniaId} = req.body
try{
    var fav = await Favorite.where({userId:userId,cabaniaId:cabaniaId}).findOne();
    if(fav){
        res.json({status:'Already exists'})
    } else {
        const favorite = new Favorite ({
            userId: userId,
            cabaniaId: cabaniaId,
        })
        await favorite.save();
        res.json({status:'Favorite saved'});
    }
} catch (err) {
    res.status(500).json({ message: 'Internal server error' + err });
  }

})

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await Favorite.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ status: 'Favorite removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' + err });
  }
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
}


module.exports = router;