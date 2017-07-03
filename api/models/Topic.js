/**
 * Topic.js
 *
 * @description :: The topic are unique and could be related to many questions.
 *
 */

 module.exports = {

   attributes: {
       id: {
           type: 'string',
           required: true,
           unique: true,
           primaryKey: true,
       },

       questions: {
           collection: 'question',
           via: 'thematic',
       },

   }
 };
