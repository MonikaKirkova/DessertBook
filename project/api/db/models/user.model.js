const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const jwtSecret = "51778657246321226641fsdklafjasdkljfsklfj";

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    recipeNames: {
        type: Array
    }
});

userSchema.methods.verifyPassword = function(password){
    return password == this.password;
}

userSchema.methods.generateJwt = function () {
    return jwt.sign({
        _id: this._id
    }, jwtSecret,
        {
            expiresIn: "10m"
        });
}

// Custom validation for email
// userSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

const User = module.exports = mongoose.model('User', userSchema);
module.exports = { User }