require('./passport');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const app = express();
const ctrlUser = require('./user.controller');
const jwtHelper = require('./jwtHelper');
const router = express.Router();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

//Load in the mongoose models
//const {Comment} = require('./db/models/comment.model');
const { User } = require('./db/models/user.model');

//Load middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

//Get comments 
app.get('/users', (req, res) => {
    User.find({}).then((comments) => {
        res.send(comments);
    });
});

// //add new comments
// app.post('/comments', (req, res) => {
//     let title = req.body.title;
//     let newComment = new Comment({
//         title
//     });
//     newComment.save().then((commentDoc) => {
//         //the full recipe document is returned
//         res.send(commentDoc);
//     });
// });

app.post('/users', (req, res) => {
    let newUser = new User();
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.recipeNames = [];
    newUser.save((userDoc) => {
        res.send(userDoc);
    });
});

app.post('/login', ctrlUser.authenticate);
app.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
app.patch('/addRecipe', jwtHelper.verifyJwtToken, ctrlUser.addRecipe);

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});