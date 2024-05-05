const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');

router.post('/', async(req, res) => {
    try {
        const data = req.body

        const newMenu = new Menu(data);
        //save the menu to the database
        const savedMenu = await newMenu.save();
        console.log('data saved');
        res.status(200).json(savedMenu);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }

})

router.get('/', async(req, res) => {
    try {
        const data = await Menu.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:tasteType', async(req, res) => {
    try {
        const tasteType = req.params.tasteType();
        if (tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'sweet') {
            const response = await Menu.find({ menu: tasteType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid taste type' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server error' });
    }
})

module.exports = router;