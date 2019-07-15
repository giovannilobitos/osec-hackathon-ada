const defaultState = {
  selectedStudentId: null,
};

export default function gameReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SELECT_STUDENT_ID': {
      return {
        ...state,
        selectedStudentId: action.studentId,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        selectedStudentId: null,
      };
    }

    case 'IS_DONE': {
      return {
        ...state,
        isDone: true,
      }
    }
  }
  
  return state;
}
