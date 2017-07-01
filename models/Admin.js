/**
 * Admin.js
 *
 * @description :: The admin could perform tasks as create questions and topics.
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
  }
};
