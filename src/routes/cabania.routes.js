const express = require('express');
const router = express.Router();
const Cabania = require('../models/cabania')
const secret = 'secret-key';
const jwt = require('jsonwebtoken');

router.get('/', async (req,res) => {
    const cabanias = await Cabania.find();
    res.json(cabanias);
})

router.get('/:id', async (req,res) => {
    const cabania = await Cabania.findById(req.params.id);
    res.json(cabania);
})

router.post('/', async (req, res) => {
    const { title, description, imgURI, mail, phone, province, city } = req.body;
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Bearer empty' });
    }
  
    try {
      const decoded = jwt.verify(token, secret);
      const { user } = decoded;
      const cabania = new Cabania({
        title: title,
        description: description,
        imgURI: imgURI,
        mail: mail,
        phone: phone,
        province: province,
        city: city
      });
      await cabania.save();
      res.json({ status: 'Cabania saved' });
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' + err });
    }
  });
 

router.put('/:id', async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Bearer empty' });
    }
    const {title,description,imgURI,mail,phone,province,city} = req.body;
    const newCabania = {title,description,imgURI,mail,phone,province,city};
    try{
        const decoded = jwt.verify(token, secret);
        
        await Cabania.findByIdAndUpdate(req.params.id,newCabania);
        res.json({status: 'Cabania updated'})
    }
    catch (err) {
      res.status(401).json({ message: 'Unauthorized' + err });
    }
})

router.delete('/:id', async (req,res) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Bearer empty' });
    }

    try{
        const decoded = jwt.verify(token, secret);

        await Cabania.findByIdAndRemove(req.params.id);
        res.json({status: 'Cabania removed'});
    }
    catch (err) {
      res.status(401).json({ message: 'Unauthorized' + err });
    }
})


module.exports = router;