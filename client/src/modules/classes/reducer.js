import { updateById } from '/lib/helpers';

const defaultState = {
  byId: {},
};

export default function classesReducer(state = defaultState, action) {
  switch (action.type) {
    case 'CLASS_LIST': {
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
