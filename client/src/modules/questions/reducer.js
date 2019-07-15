import { updateById } from '/lib/helpers';

const defaultState = {
  byId: {},
  initialQuestionId: null,
  currentQuestionId: null,
};

export default function questionsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'QUESTIONS_LIST': {
      let byId = { ...state.byId };

      action.data.data.forEach((row) => {
        byId = updateById(byId, row);
      });

      return {
        ...state,
        byId,
      };
    }

    case 'ALL_QUESTIONS': {
      const additional = {};

      let byId = { ...state.byId };

      let initialQuestionId = null;

      action.data.data.forEach((row) => {
        byId = updateById(byId, row);

        if (row.isInitial) {
          initialQuestionId = row._id;

          if (action.replaceCurrentWithInitial) {
            additional.currentQuestionId = row._id;
          }
        }
      });

      return {
        ...state,
        initialQuestionId,
        byId,
        ...additional,
      };
    }

    case 'CURRENT_QUESTION_ID': {
      return {
        ...state,
        currentQuestionId: action.currentQuestionId,
      };
    }
  }
  return state;
}
