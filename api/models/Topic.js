/**
 * Topic.js
 *
 * @description :: The topic are unique and could be related to many questions.
 *
 */

module.exports = {

  attributes: {
      id: {
          type: 'integer',
          autoIncrement: true,
          primaryKey: true,
      },

      name: {
          type: 'string',
          required: true,
          unique: true,
      },

      questions: {
          collection: 'question',
          via: 'thematic',
      },

  }
};
