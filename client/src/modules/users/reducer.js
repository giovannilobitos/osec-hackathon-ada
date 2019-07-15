import { updateById } from '/lib/helpers';

const defaultState = {
  byId: {},
};

export default function usersReducer(state = defaultState, action) {
  switch(action.type) {
    case 'USER_LIST': {
      let byId = { ...state.byId };

      action.data.data.forEach(function(row) {
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
