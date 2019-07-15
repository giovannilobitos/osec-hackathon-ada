import app from '/feathers';

export function login({ username, password }) {
  return function () {
    return app.authenticate({
      strategy: 'local',
      username,
      password,
    });
  };
}

export function logout() {
  return async function(dispatch) {
    await app.logout();
    dispatch({ type: "LOGOUT" });
  }
}
