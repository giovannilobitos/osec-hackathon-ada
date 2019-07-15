import app from '/feathers';
import { getUsers } from '/modules/users/actions';
import { getSchools } from '/modules/schools/actions';

export function createClass(data) {
  return async function () {
    await app.service('classes').create(data);
  };
}

export function getClasses(query = {}, populate) {
  return async function (dispatch) {
    const classes = await app.service('classes').find({
      query: {
        ...query,
      },
    });

    if (classes && classes.data && classes.data.length && populate) {
      const teacherIds = [];
      const schoolIds = [];

      classes.data.forEach(({ teacher_id, school_id }) => {
        if (teacher_id) {
          teacherIds.push(teacher_id);
        }

        if (school_id) {
          schoolIds.push(school_id);
        }
      });

      dispatch(getUsers({ _id: { $in: teacherIds } }));
      dispatch(getSchools({ _id: { $in: schoolIds } }));
    }

    dispatch({ type: 'CLASS_LIST', data: classes });

    return classes;
  };
}
