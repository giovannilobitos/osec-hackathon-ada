import React from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';
import MainApp from './MainApp';
import store from './redux/store';
import app from './feathers';
import './lib/assets';
// import * as serviceWorker from './serviceWorker';
// serviceWorker.register();

app.set('store', store);

const initializeApp = function () {
  setTimeout(() => {
    ReactDOM.render(<MainApp/>, document.getElementById('content'));  
    document.body.style.background = "";
  }, 2000);
};

(async function connectToApp() {
  try {
    const questions = await app.service('questions').find({
      query: {
        $limit: 9999,
      }
    });

    store.dispatch({ type: 'ALL_QUESTIONS', data: questions, replaceCurrentWithInitial: true });
    initializeApp();

  } catch(error) {
    message.error(error.message);
    setTimeout(() => {
      connectToApp();
    }, 3000);
  }
}());

// app.on('authenticated', (result) => {
//   let tryCount = 0;
//   (function getmainUser() {
//     tryCount += 1;
//     app.passport
//       .verifyJWT(result.accessToken)
//       .then(payload => app.service('users').get(payload.userId, { query: {} }))
//       .then((mainUser) => {
//         return app.service('questions').find({
//           query: {}
//         }).then(((questions) => {
//           console.log(questions);
//           return mainUser;
//         }))
//       })
//       .then((mainUser) => {
//         store.dispatch({
//           type: 'LOGIN',
//           mainUser,
//         });
//       })
//       .catch((error) => {
//         if (tryCount > 2) {
//           return toastr.error(`An error occurred while validating accessToken. Debug:${error.message}`);
//         }
//
//         setTimeout(() => {
//           getmainUser();
//         }, 2000);
//       });
//   }());
// });

// (function connectToApp() {
//   app.authenticate()
//     .then(initializeApp)
//     .catch((e) => {
//       const { message } = e;
//       if (message && (
//         message.toLocaleLowerCase().includes('network error')
//           || message.toLocaleLowerCase().includes('authentication timed out')
//           || message.toLocaleLowerCase().includes('socket connection timed out')
//       )) { // Retry
//         toastr.error('Server is down. Trying to reconnect...');
        // setTimeout(() => {
        //   connectToApp();
        // }, 3000);
//         return;
//       }
//
//       initializeApp();
//     });
// }());
