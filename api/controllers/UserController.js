/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const waterfall = require('async/waterfall');

 function createUser(req, res){
    waterfall([
        (cbwtf) => {
            User.create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            }).exec(cbwtf);
        },
    ], (err, user) => {
        if (err) {
            // TODO: Show the error in a nice way
            // TODO: Validate
            console.log(err);
            return res.status(500).send('Error');
        }
        return res.status(201).view('homepage');
    });
 }

module.exports = {
	createUser,
};
