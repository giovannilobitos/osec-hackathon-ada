import app from '/feathers';

export function createClass(data) {
  return async function () {
    await app.service('classes').create(data);
  };
}

export function getClasses(query = {}) {
  return async function (dispatch) {
    const classes = await app.service('classes').find({
      query: {
        ...query,
      },
    });

    dispatch({ type: 'CLASS_LIST', data: classes });

    return classes;
  };
}
