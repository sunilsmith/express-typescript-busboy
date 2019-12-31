import express from 'express';
import { handler } from './handler';
import * as bodyParser from 'body-parser';

const app = express();
const routes = require('express').Router();
const PORT = process.env.PORT || 3000;


// parsing request
app.use(bodyParser.raw());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);



//  Connect all our routes to our application
app.use('/', routes);
routes.use('/', handler.router);
// Turn on that server!
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});