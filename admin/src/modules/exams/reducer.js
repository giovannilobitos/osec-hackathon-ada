import { updateById } from '/lib/helpers';

const defaultState = {
  byId: {},
};

export default function examsReducer(state = defaultState, action) {
  switch (action.type) {
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

    case 'UPDATE_EXAM':
    case 'CREATE_EXAM': {
      return {
        ...state,
        byId: updateById({ ...state.byId }, action.data),
      };
    }
  }
  return state;
}
