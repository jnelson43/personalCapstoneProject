const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const restaurantsRoute = require('./routes/restaurants');
app.use('/restaurants', restaurantsRoute);

const tagsRoute = require('./routes/tags');
app.use('/tags', tagsRoute);
//ROUTES
app.get('/', (req, res) => {

	res.send("Welcome");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to DB!'));

//Will listen on localhost port 3000
app.listen(3000);