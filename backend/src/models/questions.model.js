// questions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const questions = new Schema({
    text: String,
    choices: [{text: String, weight: Number}],
    nextQuestion:{
      a: Schema.Types.ObjectId,
      b: Schema.Types.ObjectId,
      c: Schema.Types.ObjectId,
      d: Schema.Types.ObjectId,
    },
    isInitial: Boolean,
  }, {
    timestamps: true
  });

  return mongooseClient.model('questions', questions);
};


// {
//   text: 'question 1',
//   choices: [
//     {text: 'a', weight: 1},
//     {text: 'b', weight: 1},
//     {text: 'c', weight: 1},
//     {text: 'd', weight: 1}
//   ],
//   nextQuestion:{
//     a: '123',
//     b: '123',
//     c: '123',
//     d: '123',
//   },
//   exam_id: ObjectId("5d294dc5a9bdc31bf7f0315f"),
//   isInitial: true
// }
