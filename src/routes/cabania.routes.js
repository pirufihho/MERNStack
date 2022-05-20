const express = require('express');
const router = express.Router();
const Cabania = require('../models/cabania')

router.get('/', async (req,res) => {
    const cabanias = await Cabania.find();
    res.json(cabanias);
})

router.get('/:id', async (req,res) => {
    const cabania = await Cabania.findById(req.params.id);
    res.json(cabania);
})

router.post('/', async (req,res) => {
    const {title,description,imgURI,mail,phone} = req.body
    const cabania = new Cabania ({
        title: title,
        description: description,
        imgURI: imgURI,
        mail: mail,
        phone: phone
    })
    await cabania.save();
    res.json({status:'Cabania saved'});
})

router.put('/:id', async (req, res) => {
    const {title,description,imgURI,mail,phone} = req.body;
    const newCabania = {title,description,imgURI,mail,phone};
    await Cabania.findByIdAndUpdate(req.params.id,newCabania);
    res.json({status: 'Cabania updated'})
})

router.delete('/:id', async (req,res) => {
    await Cabania.findByIdAndRemove(req.params.id);
    res.json({status: 'Cabania removed'});
})


module.exports = router;