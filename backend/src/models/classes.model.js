// classes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

function getRandomCode() {
  const characters = ['a','b','c','d','e','f','g','h','i'];
  const codeLength = 3;

  let code = "";

  for (let i = 0; i < codeLength; i+= 1) {
    code = `${code}${characters[Math.floor(Math.random()*characters.length)]}`;
  }

  return code;
}

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const classes = new Schema({
    level: Number,
    name: String,
    school_id: Schema.Types.ObjectId,
    teacher_id: Schema.Types.ObjectId,
    code: { type: String, default: getRandomCode },
  }, {
    timestamps: true
  });

  return mongooseClient.model('classes', classes);
};
