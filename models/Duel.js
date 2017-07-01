/**
 * Duel.js
 *
 * @description :: Duels are the way to challenge another players and test their knowledge.
 *
 */

module.exports = {

  attributes: {
      id: {
          type: 'integer',
          autoIncrement: true,
          primaryKey: true,
      },

      questions: {
          type: 'array',
          required: true,
      },

      challengerAnswers: {
          type: 'json',
          columnName: 'challenger_ answers',
      },

      opponentAnswers: {
          type: 'json',
          columnName: 'opponent_ answers',
      },

      challenger: {
          model: 'user',
      },

      opponent: {
          model: 'user',
      },

  }
};
