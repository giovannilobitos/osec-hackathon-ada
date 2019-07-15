// Application hooks that run for every service
const log = require('./hooks/log');

module.exports = {
  before: {
    all: [(context) => console.log(context.method , context.path, JSON.stringify(context.params.query, null, 2))],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      (context) => {
        if(context.error){
          console.log(context.error)
        }
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
