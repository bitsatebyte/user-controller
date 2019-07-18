const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const { mongodbURI } = require('./config/keys');
const users = require('./validation/routes/api/users');

// Initialize middleware

const app = express();

// Bodyparser middleware

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Connect to mongodb on clevercloud
mongoose.connect(mongodbURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connection successful"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());


// Passport Config
require('./config/passport');


// Routes

app.use('/api/users', users);

// For production

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));

