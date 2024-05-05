const mongoose = require('mongoose');

// Connect to MongoDB

const mongoURL = 'mongodb://localhost:27017/hotels';
mongoose.connect(mongoURL, {
        useNewUrlParser: true, // Deprecated option (no longer needed)
        useUnifiedTopology: true // Deprecated option (no longer needed)
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

//Get the default connection

const db = mongoose.connection;
db.on('connected', () => {
    console.log("Connected to mongodb server");
})

db.on('error', (err) => {
    console.log("Mongodb connection error");
})

db.on('disconnected', () => {
    console.log("Mongodb disconnected");
})

//export the database connection

module.exports = db;