const express = require('express');
const ExpressError = require('./expressError');

const app = express();

const dogs = ['Sage', 'Milo', 'Zazu'];

app.get('/dogs/:dogName', function (req, res, next) {
    const dogName = req.params.dogName;

    try {
        if (!dogs.includes(dogName)) {
            throw new ExpressError(`${dogName} isn't in the house :(`, 404)
        };
        return res.send(`${dogName} is in the house!`);
    } catch (e) {
        next(e);
    };
});

// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

// generic error handler
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;

    // set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});

app.listen(3000, function () {
    console.log('App on port 3000');
});