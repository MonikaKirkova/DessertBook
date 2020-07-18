const passport = require('passport');
const _ = require('lodash');
const { User } = require('./db/models/user.model');

//authenticate the user login
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(404).json(err);
        // registered user
        if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(401).json(info);
    })(req, res);
}

//add users to databse
module.exports.addUsers = (req, res, next) => {
    let newUser = new User();
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.recipeNames = [];
    newUser.save((userDoc) => {
        res.send(userDoc);
    });
}

//get users from database
module.exports.getUsers = (req, res, next) => {
    User.find({}).then((users) => {
        res.send(users);
    });
}

//get information regarding current user
module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email', 'recipeNames']) });
        }
    );
}

//add favourite recipe for current user
module.exports.addFavouriteRecipe = (req, res, next) =>{
    User.findOneAndUpdate({ _id: req._id }, {
        $set: {recipeNames: req.body.recipeNames }
    }).then(() => {
        res.send({ message: 'updated successfully'});
    });
}