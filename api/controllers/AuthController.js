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
                return res.redirect('/wlogin');
            req.logIn(user, function(err) {
                if (err)
					           res.send(err);
                console.log(user.id);
                return User.findOne({id : user.id})
                  .then((foundUser) =>{
                    console.log(foundUser);
                    res.status(201).view('principal', {
                      users : foundUser
                    });
                  }).catch((err) =>{
                    res.status(500).send("Something went wrong");
                  });
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
