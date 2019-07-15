import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import socketio from '@feathersjs/socketio-client';
import { message } from 'antd';
const app = feathers();
import store from '/redux/store';

const socket = io(process.env.BACKEND_URL);
app.configure(socketio(socket));

const storage = window.localStorage;

app.set('storage', storage);
app.configure(auth({ storage, storageKey: process.env.STORAGE_KEY }));

const labels = {
  created: 'CREATE',
  updated: 'UPDATE',
  exams: 'EXAM',
};

['exams']
  .forEach(function(serviceName) {
  ['created', 'updated']
  .forEach(function(event) {
    app.service(serviceName).on(event, (data) => {
      console.log(event, serviceName, `${labels[event]}_${labels[serviceName]}`, data);
      store.dispatch({ type: `${labels[event]}_${labels[serviceName]}`, data });
    });
  });
});

window.app = app;

export default app;
