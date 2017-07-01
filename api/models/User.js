/**
 * User.js
 *
 * @description :: The user could create games or "duels" with other players on the game.
 *
 */

module.exports = {

  attributes: {
      id: {
          type: 'integer',
          autoIncrement: true,
          primaryKey: true,
      },

      username: {
          type: 'string',
          required: true,
          unique: true,
      },

      password: {
          type: 'string',
          required: true,
      },

      email: {
          type: 'email',
          required: true,
          unique: true,
      },

      challengerDuels: {
          collection: 'duel',
          via: 'challenger'
      },

      opponentDuels: {
          collection: 'duel',
          via: 'opponent'
      },
      saluda: () => {
      console.log('Hola');
      },
  }
};
