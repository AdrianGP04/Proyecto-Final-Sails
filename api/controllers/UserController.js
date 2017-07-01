/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 function createUser(req, res)
 {
 	//Pasar a wf
 	console.log("Hola");
 	User.create({
 		username: req.param('nombre'),
 		password: req.param('password'),
 		email: req.param('mail'),
 	}).exec((err, user) => {
 		if(err){
 			return res.status(500).send('Error');
 		}
 		return res.status(201).send('Usuario Registrado');
 	});
 }

module.exports = {
	createUser,
};
