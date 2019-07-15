// answers-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const answers = new Schema({
    value: String,
    weight: Number,
    question_id: Schema.Types.ObjectId ,
    student_id: Schema.Types.ObjectId ,
    exam_id: Schema.Types.ObjectId,
  }, {
    timestamps: true
  });

  return mongooseClient.model('answers', answers);
};
