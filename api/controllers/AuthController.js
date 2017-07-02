/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var passport = require('passport');

 module.exports = {
     _config: {
         actions: false,
         shortcuts: false,
         rest: false
     },
     login: function(req, res) {
         passport.authenticate('local', function(err, user, info) {
            if (err || (!user))
                return res.view('login', {
                    credentialsError: true,
                    message: 'Invalid credentials'
                });
            req.logIn(user, function(err) {
                if (err)
					res.send(err);
                return res.redirect('/principal');
            });
         })(req, res);
     },

     logout: function(req, res) {
         req.logout();
         res.view('homepage', {
            status: 200,
            message: 'Logged out succesfully'
         });
     }
 };
