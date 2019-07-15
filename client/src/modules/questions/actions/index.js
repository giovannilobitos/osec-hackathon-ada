import app from '/feathers';

export function getQuestions(query = {}) {
  return async function (dispatch) {
    const questions = await app.service('questions').find({
      query: {
        ...query,
      },
    });

    dispatch({ type: 'QUESTIONS_LIST', data: questions });

    return classes;
  };
}
