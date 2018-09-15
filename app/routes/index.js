"use strict";

const render = require('../service/renderService');

UA.onGet('/index', function(req, res, next) {
    res.send(render('index', {}));
});

UA.onGet('/', function(req, res, next) {
    res.redirect('/index');
});