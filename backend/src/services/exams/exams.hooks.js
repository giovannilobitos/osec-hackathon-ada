

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      async (context) => {
        const { result: exam, app } = context;

        if(exam.progress > 90 && exam.status === 'ongoing'){
          const { data: answers } = await app.service('answers').find({query:{exam_id: exam._id}})
          const weight = answers.map((answer) => answer.weight).reduce((total, num) => total + num);
          const result = Math.round(weight/answers.length);
          context.result = await app.service('exams').patch(exam._id, { result, status: 'done', progress: 100 })
        }

        return context
      }
    ],
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
