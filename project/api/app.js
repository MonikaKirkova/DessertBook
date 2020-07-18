require('./passport');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const app = express();
const userController = require('./user.controller');
const jwtHelper = require('./jwtHelper');
const router = express.Router();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

//Load in the mongoose models

const { User } = require('./db/models/user.model');

//Load middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.get('/users', userController.getUsers);

app.post('/users', userController.addUsers);

app.post('/login', userController.authenticate);

app.get('/userProfile', jwtHelper.verifyJwtToken, userController.userProfile);

app.patch('/addFavouriteRecipe', jwtHelper.verifyJwtToken, userController.addFavouriteRecipe);

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});