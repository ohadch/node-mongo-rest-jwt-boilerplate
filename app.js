require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require(`_helpers/jwt`);
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require(`users/user.controller`));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8000;

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
