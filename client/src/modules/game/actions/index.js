import app from '/feathers';

export function selectStudentId(studentId) {
  return function (dispatch) {
    dispatch({ type: "SELECT_STUDENT_ID", studentId });
  };
}

export function submitAnswer(data, nextQuestion) {
  return async function(dispatch) {
    await app.service("answers").create(data);

    if (!nextQuestion) {
      dispatch({ type: 'IS_DONE' });
    }

    dispatch({ type: 'CURRENT_QUESTION_ID', currentQuestionId: nextQuestion });
  }
}
