/**
 * Question.js
 *
 * @description :: Questions are fundamental for the game, as they are a challenge to the players.
 *
 */

module.exports = {

  attributes: {
      id: {
          type: 'integer',
          autoIncrement: true,
          primaryKey: true,
      },

      text: {
          type: 'string',
          required: true,
          unique: true,
      },

      correctAnswer: {
          type: 'string',
          required: true,
          columnName: 'correct_answer',
      },

      incorrectAnswers: {
          type: 'array',
          required: true,
          columnName: 'incorrect_answers',
      },

      thematic: {
          model: 'topic',
      },

  }
};
