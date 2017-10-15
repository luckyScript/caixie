var UserModel = require("mongoose").model('User');
var bcrypt = require('bcryptjs');

function User(obj) {
    for (var i in obj) {
        this[i] = obj[i];
    }
}
User.prototype.register = function (fn) {
    var user = this;
    UserModel.findOne({username: this.username}).exec(function (err, userExists) {
        if (err) return fn(err);
        if (userExists) return fn(null, 409);
        user.hashPassword(function () {
            var userData = new UserModel(user);
            userData.save(user, function (err, user) {
                if (err) return fn(err);
                fn(null, user);
            });
        });
    });
};
User.prototype.hashPassword = function (fn) {
    var user = this;
    bcrypt.genSalt(12, function(err, salt) {
        if (err) return fn(err);
        user.salt = salt;

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return fn(err);
            user.password = hash;
            fn();
        });
    });
};
User.prototype.login = function (fn) {
    var user = this;
    UserModel.findOne({username: user.username}).exec(function (err, userExists) {
        if (err) return fn(err);
        if (!userExists) return fn(null, 404);
        bcrypt.hash(user.password, userExists.salt, function (err, hash) {
            if (err) return fn(err);
            if (userExists.password == hash) {
                return fn(null, {power: userExists.power, code: 200});
            }
            fn(err, 403);
        });
    });
}
User.findIdByName = function (username, fn) {
    UserModel.findOne({username: username}).exec(function (err, userExists) {

        if (err) return fn(err);
        if (!userExists) return;
        // console.log(userExists._id);
        fn(userExists._id);
    })
}

module.exports = User;
