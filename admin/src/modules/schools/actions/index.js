import app from '/feathers';

export function createSchool(data) {
  return async function () {
    await app.service('schools').create(data);
  };
}

export function getSchools(query = {}) {
  return async function (dispatch) {
    const schools = await app.service('schools').find({
      query: {
        ...query,
      },
    });

    dispatch({ type: 'SCHOOL_LIST', data: schools });

    return schools;
  };
}
