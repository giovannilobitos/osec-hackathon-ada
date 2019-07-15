const users = require('./users/users.service.js');
const exams = require('./exams/exams.service.js');
const questions = require('./questions/questions.service.js');
const answers = require('./answers/answers.service.js');
const classes = require('./classes/classes.service.js');
const schools = require('./schools/schools.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(exams);
  app.configure(questions);
  app.configure(answers);
  app.configure(classes);
  app.configure(schools);
};
