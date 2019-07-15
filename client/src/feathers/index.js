import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import socketio from '@feathersjs/socketio-client';
import { message } from 'antd';
const app = feathers();

const socket = io(process.env.BACKEND_URL);
app.configure(socketio(socket));

const storage = window.localStorage;

app.set('storage', storage);
app.configure(auth({ storage, storageKey: process.env.STORAGE_KEY }));

window.app = app;

export default app;
