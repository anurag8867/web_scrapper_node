var express = require('express'),
    { checkSchema, validationResult } = require("express-validator"),
    { error } = require("../helpers/error"),
    config = require('config'),
    mathService = require("../services/math");

var app = express();


app.get('/', checkSchema({
    // id: {
    //     in: ['body'],
    //     errorMessage: 'ID is wrong',
    //     isInt: true,
    //     // Sanitizers can go here as well
    //     toInt: true
    // }
}), function (req, res) {
    validationResult(req).throw();
    res.send('Hello Sir');
});
app.get('/add', function (req, res) {
    return res.status((config.get('httpStatusCode.oK') && parseInt(config.get('httpStatusCode.oK')) || parseInt(config.get('httpStatusCode.oK'))))
        .send({ result: mathService.add(10, 11) });
});

app.post('/hello', function (req, res) {
    process.connection.query('INSERT INTO table1 SET ?', { name: 'Craig Buckler', city: 'Bangalore' }, (err, result) => {
        if (err) new error();
        console.log('Last insert ID:', result.insertId);
        res.status(config.get('httpStatusCode.created')).send({ result })
    });
});

module.exports = app;