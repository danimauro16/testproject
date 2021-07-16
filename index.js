/*
    User routes / Auth
    host + /api/v1/auth
*/
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');


// create express server
const app = express();

// CORS
app.use(cors());

// body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Upload files
app.use(fileUpload())

// public directory
app.use(express.static('public'));

app.use('/api/v1/auth', require('./controllers/auth'));
app.use('/api/v1/recipes', require('./controllers/recipes'));
app.use('/api/v1/ingredients', require('./controllers/ingredients'));
app.use('/api/v1/categories', require('./controllers/categories'));

// listen requests
app.listen(process.env.PORT, () => {
    console.log(`Server started ${process.env.PORT}`);
});

