// exams-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const exams = new Schema({
    name: String,
    student_id: Schema.Types.ObjectId,
    status: { type: String, default: 'ongoing'}, //ongoing, done
    progress: {type: Number, default: 0 },
    result: {type: Number, default: null }, // percentage
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
  }, {
    timestamps: true
  });

  return mongooseClient.model('exams', exams);
};
