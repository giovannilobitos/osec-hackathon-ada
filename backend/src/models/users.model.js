// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const users = new mongooseClient.Schema({
    username: String,
    name: String,
    gender: String,
    password: String,
    role: String,
    school_id: Schema.Types.ObjectId,
    class_id: Schema.Types.ObjectId,
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
