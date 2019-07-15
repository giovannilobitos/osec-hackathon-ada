const defaultState = {
  byId: {},
  selectedExamId: null,
};

export default function examsReducer(state = {}, action) {
  switch(action.type) {
    case 'SELECT_EXAM_ID': {
      return {
        ...state,
        selectedExamId: action.examId,
      };
    }

    case 'CREATE_EXAM': {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.data._id]: action.data,
        },
        selectedExamId: action.data._id,
      }
    }

    case 'EXAM_LIST': {
      let byId = { ...state.byId };

      action.data.data.forEach((row) => {
        byId = updateById(byId, row);
      });

      return {
        ...state,
        byId,
      };
    }
  }

  return state;
}
