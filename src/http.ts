import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';
import { routes } from './routes';

const app = express();

const locationFolderPublic = path.join(__dirname, '..', 'public');

app.use(express.static(locationFolderPublic));
app.set('views', locationFolderPublic);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (req, res) => {
  return res.render('html/client.html');
});

app.get('/pages/admin', (req, res) => {
  return res.render('html/admin.html');
});

//http
const http = createServer(app);
//WS
const io = new Server(http);

io.on('connection', (socket: Socket) => {
 // console.log('Se conectou', socket.id);
});

app.use(express.json());
app.use(routes);

export {http , io} ;