const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [
      (context) => {
        const { params: { query }} = context
        if(query.exam){
          context.params.populate = ['lastestExam'];
          delete context.params.query.exam;
        }
      }
    ],
    get: [],
    create: [ hashPassword() ],
    update: [ hashPassword() ],
    patch: [ hashPassword() ],
    remove: []
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [
      async (context) => {
        const { result: { data }, params, app } = context;

        if(params.populate && params.populate.includes('lastestExam')) {
          const requests = data.map((user) => {
            return app.service('exams').find({query: { student_id: user._id, $sort: { createdAt: -1 }, $limit:1}});
          });
          const exams = await Promise.all(requests);

          context.result.data = data.map((user,index) => {
            user.exam = exams[index].data[0] || null;
            return user
          })
        }
        return context;
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
