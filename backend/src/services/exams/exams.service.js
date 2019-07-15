// Initializes the `exams` service on path `/exams`
const createService = require('feathers-mongoose');
const createModel = require('../../models/exams.model');
const hooks = require('./exams.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/exams', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('exams');

  service.hooks(hooks);
};
