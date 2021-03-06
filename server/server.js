import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import logger from 'morgan';
import { log } from 'util';
import path from 'path';
import cors from 'cors';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webPackConfig from '../webpack.config';

// import all api routes
import routes from './routes';

import BaseHelper from './helper/BaseHelper';

const { businessRoutes, userRoutes } = routes;

// load environment variables into proccess.env method
dotenv.config();

const app = express();
const port = process.env.PORT || 8011;
const compiler = webpack(webPackConfig);

app.use(webpackDevMiddleware(compiler));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.set('port', port);
app.use(logger('dev'));
app.disable('x-powered-by');

// parse api request body into JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ verify: BaseHelper.handleRaw, type: '*/*' }));


// expose all routes
app.use(userRoutes);
app.use(businessRoutes);

// handle unmatched routes with of each of the http methods
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

// expose a static directory
app.use(express.static(path.resolve(__dirname, './public')));

// serve api docs
app.route('/api-docs').get((req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});


// create server and listen for requests at the designated port
const server = http.createServer(app);
server.listen(port);
log(`listening on port: ${port}`);
log(`environment: ${process.env.NODE_ENV}`);
export default server;
