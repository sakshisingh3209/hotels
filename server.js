const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require('body-parser');
app.use(bodyParser.json());

//if url is not present then use port 3000
const PORT = process.env.PORT || 3000;

//middelware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); //Move to the next phase
}

app.use(logRequest);


const localAuthMiddelware = passport.authenticate('local', { session: false });
app.use(passport.initialize());
app.get('/', function(req, res) {
    res.send("Welcome to our hotel......");
})

const Menu = require('./models/Menu');







//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//Use the router files
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);



app.listen(3000, () => {
    console.log('listening on port 3000');
})