import app from '/feathers';

export function login({ username, password }) {
  return async function () {
    const { total } = await app.service('users').find({ query: { role: { $in: ['admin', 'teacher'] }, username, $limit: 0 } });

    if (!total) {
      throw new Error('Invalid login');
    }

    return await app.authenticate({
      strategy: 'local',
      username,
      password,
    });
  };
}

export function logout() {
  return async function (dispatch) {
    await app.logout();
    dispatch({ type: 'LOGOUT' });
  };
}
