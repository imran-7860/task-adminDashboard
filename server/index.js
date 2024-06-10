const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('../route/route'); // Adjust path as needed

const app = express();

mongoose.connect('mongodb+srv://imranansarik365:h1J2HAuKExhUlfK1@cluster0.t8zy953.mongodb.net/adminInformation', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', route);

app.use('/*', (req, res) => {
    res.status(404).send({ status: false, message: 'Page not found' });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
