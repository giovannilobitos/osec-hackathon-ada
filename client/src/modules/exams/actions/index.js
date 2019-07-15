import app from '/feathers';

export function createExam(data) {
  return async function (dispatch) {
    const result = await app.service('exams').create(data);
    dispatch({ type: 'CREATE_EXAM', data: result });
    return result;
  }
}

export function getExams(query = {}) {
  return async function (dispatch) {
    const exams = await app.service('exams').find({
      query: {
        ...query,
      },
    });

    dispatch({ type: 'EXAM_LIST', data: exams });

    return exams;
  };
}
