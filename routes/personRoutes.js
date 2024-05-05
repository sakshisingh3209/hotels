const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//method to create a person
router.post('/', async(req, res) => {

    try {
        const dataMenu = req.body //Assuming the request body contains the person data

        //create a new person document using the Mongoose model
        const newPerson = new Person(dataMenu);

        //Save the new person to the database
        const savedPerson = await newPerson.save();
        console.log('data saved');
        res.status(200).json(savedPerson);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/', async(req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log('listening port 3000');

    }
})

router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType; //extract the work type from the url parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


//update the data

router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return the update data
            runValidators: true, //run Mongoose validation
        })
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data updated');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//delete the record

router.delete('/:id', async(req, res) => {
    try {
        const personId = req.params.id; //extract the person id from the url parameter

        //assuming you have a person mode
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("data deleted");
        res.status(200).json({ message: "person deleted successfully" });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})
module.exports = router;