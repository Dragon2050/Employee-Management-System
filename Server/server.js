const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5100;

// * MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
        console.log('Connected to server');
    } catch (err) {
        console.log(`MongoDB error for error ${err}`);
        throw err;
    }
};

app.use(bodyParser.json());
app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true,
    optionsSuccessStatus: 200,
}));

// ? API to check connection to servers
app.get('/', (req, res) => {
    try {
        res.status(200).json({ mesage: 'Connections are established' });
    } catch (err) {
        res.status(500).json({ mesage: 'Connections are not established' });
    }
});

// ~ Router API for auth controller
app.use('/auth', require('./src/routers/authController'));

// ~ Router API for user controller
app.use('/users', require('./src/routers/userController'));

// * Server listening port functionality
app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`Server is listening on port ${port}`);
    } catch (err) {
        console.log('Server cannot be connected because of the error:');
        console.log(err);
    }
});