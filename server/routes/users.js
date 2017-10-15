var User = require('../controllers/user');

exports.register = function(app) {
    return function(req, res, next) {
        var context = {
            state: {
                state: 'register'
            },
            session: req.session

        };
        res.render('page', context);
    }
}
exports.registerHandle = function(app) {
    return function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var invite = req.body.invite;
        var power = 1;
        user = new User ({
			username: username,
			password: password,
            power: power
		});

		user.register(function(err, user) {
			if (err) return next(err);
			if (user == 409) {
                // username is exist
                res.send({"result": "0"});
    			res.statusCode = 409;
                return;
			} else {
				res.statusCode = 200;
                res.send({"result": "1"});
                return;
			}
		})
    }
}

// get value posted from /views/login.ejs
exports.loginHandle = function(app) {
    return function (req, res, next) {
        console.log(req.session)
        var username = req.body.username;
        var password = req.body.password;
        var user = new User({
            username: username,
            password: password
        })
        user.login(function(err, userCode) {
            if (err) return next(err);
            if (userCode == 404) {
                console.log("not exist");
                // user not exist
                res.statusCode = 404;
                return;
            } else if (userCode == 403) {
                // wrong password
                res.send({"result": "1"});
                res.statusCode = 403;
            } else if (userCode.code == 200) {
                // success
                req.session.user = {
                    username: user.username,
                    power: userCode.power|| 2
                };
                res.send({"result": "2"});
            }
        })
    }
}

// get login page 
exports.login = function(app) {
    return function (req, res, next) {
        if (req.session && req.session.user) {
            res.redirect('/');
            return;
        } else {
            var context = {
                state: {
                    state: 'login'
                },
                session: req.session
            };
            res.render('page', context);
        }
    }
}
exports.logout = function (app) {
    return function (req, res, next) {
        if (req.session.user) {
            req.session.destroy(function (err) {
                if (err) next(err);
                console.log('destroyed the session');
                res.status(302);
                res.redirect('/');
            });
        } else {
            res.status(302);
            res.redirect('/');
        }
    }
}
