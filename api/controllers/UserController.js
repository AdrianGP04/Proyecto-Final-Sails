/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const waterfall = require('async/waterfall');
const bcrypt = require('bcrypt');

 function createUser(req, res){
    waterfall([
        (callback) => {
            bcrypt.hash(req.body.password, 8, (err, hashedPassword) => {
                // TODO: Show the error in a nice way
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error');
                }
                req.body.password = hashedPassword;
                callback(null);
            });
        },
        (cbwtf) => {
            User.create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            }).exec(cbwtf);
        },
    ], (err, user) => {
        if (err) {
            // TODO: Validate
            console.log(err);
            return res.status(500).send('Error');
        }
        return res.status(201).view('homepage');
    });
}

function auth(req, res){
    return res.login({
        successRedirect: '/principal'
    });
}

module.exports = {
	createUser,
    auth,
};
