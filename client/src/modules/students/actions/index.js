import app from '/feathers';

export function createStudent(data) {
  return async function () {
    await app.service('users').create(data);
  };
}

export function getStudents(teacher_id) {
  return async function () {
    const students = await app.service('users').find({
      query: {
        teacher_id,
        role: 'student',
      },
    });

    return students;
  };
}
