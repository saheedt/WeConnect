import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import logger from 'morgan';
import { log } from 'util';

// import all api routes
import Routes from './routes/routes';

// load environment variables into proccess.env method
dotenv.config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 8011;

app.set('port', port);
app.use(logger('dev'));
app.disable('x-powered-by');

// parse api request body into JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Routes(app);

// handle unmatched routes with of each of the http methods
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

// create server and listen for requests at the designated port
const server = http.createServer(app);
server.listen(port);
log(`listening on port: ${port}`);
export default server;
