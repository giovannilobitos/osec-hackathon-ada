import app from '/feathers';
import { getClasses } from '/modules/classes/actions';
import { getSchools } from '/modules/schools/actions';

export function createUser(data) {
  return async function () {
    return await app.service('users').create(data);
  };
}

export function getUsers(query = {}, populate) {
  return async function (dispatch) {
    const users = await app.service('users').find({
      query: {
        ...query,
      },
    });

    if (users && users.data && users.data.length && populate) {
      const classIds = [];
      const schoolIds = [];

      users.data.forEach(({ class_id, school_id }) => {
        if (class_id) {
          classIds.push(class_id);
        }

        if (school_id) {
          schoolIds.push(school_id);
        }
      });

      dispatch(getClasses({ _id: { $in: classIds } }));
      dispatch(getSchools({ _id: { $in: schoolIds } }));
    }

    dispatch({ type: 'USER_LIST', data: users });

    return users;
  };
}
