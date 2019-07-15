

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      (context) => {
        const { result: answer, app } = context;
        console.log(context.data);
        if(answer.exam_id){
          app.service('exams').patch(answer.exam_id, { $inc: { progress: 16.5 } })
        }

        return context
      }
    ],
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
