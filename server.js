var express = require('express');
    app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
