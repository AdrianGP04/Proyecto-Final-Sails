/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var passport = require('passport');
 var on_goingDuels = [];
var finishedDuels = [];
var on_goingPCDuels = [];
var finishedPCDuels = [];


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
                return User.findOne({id : user.id})
                  .then((foundUser) =>{
                    Duel.find().exec((err,foundDuels) => {
                     if (err || foundDuels == ''){
                       console.log("There are no Duels ur game is dead af");
                       on_goingDuels.push('empty');
                       finishedDuels.push('empty');
                       on_goingPCDuels.push('empty');
                       finishedPCDuels.push('empty');
                       console.log(on_goingDuels[0]);
                       return res.status(201).view('principal', {
                        users : foundUser,
                        on_goingDuels : on_goingDuels,
                        finishedDuels : finishedDuels,
                        on_goingPCDuels : on_goingPCDuels,
                        finishedPCDuels : finishedPCDuels,
                      });
                     }else {
                     console.log("here @ the else, if you didn't have shit in the database, something is not ok");
                     console.log(foundDuels);
                     for (var duelz of foundDuels)
                     {
                       console.log('doin stuf');
                       if (duelz.challenger == foundUser.id || duelz.opponent == foundUser.id && duelz.opponent != 'computer')
                       {
                         if (duelz.status == 'on-going')
                            on_goingDuels.push(duelz.challenger +'vs' + duelz.opponent );
                         else
                           finishedDuels.push(duelz.challenger +'vs' + duelz.opponent + '. Winner: (aquí va el ganador)');
                       }
                       else

                       if (duelz.challenger == user && duelz.opponent == 'computer')
                       {
                         if (duelz.status == 'on-going')
                            on_goingPCDuels.push(foundUser.username +'vs computer id:'+ duelz.id );
                         else
                           finishedPCDuels.push(foundUser.username +'vs computer id:'+duelz.id + 'Winner: (aquí va el ganador)');
                       }
                       console.log('doin stuf');
                       on_goingDuels.push('empty');
                       finishedDuels.push('empty');
                       on_goingPCDuels.push('empty');
                       finishedPCDuels.push('empty');
                       return res.status(201).view('principal', {
                        users : foundUser,
                        on_goingDuels : on_goingDuels,
                        finishedDuels : finishedDuels,
                        on_goingPCDuels : on_goingPCDuels,
                        finishedPCDuels : finishedPCDuels,
                      });
                     }
                   }
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
