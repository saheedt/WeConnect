import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { log } from 'util';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 8011;

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// all routes entry

app.route('*').get((req, res) => res.status(404).send({
  message: 'invalid route!',
}));
app.route('*').post((req, res) => res.status(404).send({
  message: 'invalid route!',
}));
app.route('*').put((req, res) => res.status(404).send({
  message: 'invalid route!',
}));
app.route('*').delete((req, res) => res.status(404).send({
  message: 'invalid route!',
}));

const server = http.createServer(app);
server.listen(port);
log(`listening on port: ${port}`);
export default server;
