import { updateById } from '/lib/helpers';

const defaultState = {
  byId: {},
};

export default function usersReducer(state = defaultState, action) {
  switch (action.type) {
    case 'USER_LIST': {
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
      if (!action.data.student_id) {
        return state;
      }

      return {
        ...state,
        byId: updateById(state.byId, {
          _id: action.data.student_id,
          exam: action.data,
        }),
      };
    }
  }

  return state;
}
