const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

const dotenv = require ('dotenv');
const mongoose = require("mongoose");
dotenv.config();

const User = require('./models/user');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log("API Running on port", process.env.PORT);
})

require("./routes/route.js")(app);
