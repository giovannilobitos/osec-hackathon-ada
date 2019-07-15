import app from '/feathers';

export function createExam(data) {
  return async function () {
    await app.service('exams').create(data);
  };
}

export function getExams(query = {}, populate) {
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
