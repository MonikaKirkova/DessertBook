const passport = require('passport');
const _ = require('lodash');
const { User } = require('./db/models/user.model');

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(404).json(err);
        // registered user
        if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(401).json(info);
    })(req, res);
}

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

module.exports.addRecipe = (req, res, next) =>{
    User.findOneAndUpdate({ _id: req._id }, {
        $set: {recipeNames: req.body.recipeNames }
    }).then(() => {
        res.send({ message: 'updated successfully'});
    });
}