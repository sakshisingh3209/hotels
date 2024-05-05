const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const Person = require('./models/Person');
const Menu = require('./models/Menu');



app.get('/', function(req, res) {
    res.send("Welcome to our hotel......");
})




//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//Use the router files
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, () => {
    console.log('listening on port 3000');
})