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
    } catch (err) {
        next(err);
    };
});


//route to find the mean of nums
app.get('/mean', function (req, res, next) {
    try {
        let nums = req.query.nums.split(',');
        nums = nums.map(num => parseInt(num));
        if (nums.includes(NaN)) {
            throw new ExpressError(`Cannot find mean of ${req.query.nums}. Perhaps they are not all integers?`, 400);
        }

        const sum = nums.reduce((acc, num) => acc + num, 0);
        const mean = sum / nums.length;
        return res.status(200).json({
            'mean': mean
        });
    } catch (err) {
        next(err);
    };
});


//route to find the median of nums
app.get('/median', function (req, res, next) {
    try {
        let nums = req.query.nums.split(',');
        nums = nums.map(num => parseInt(num));
        if (nums.includes(NaN)) {
            throw new ExpressError(`Cannot find median of ${req.query.nums}. Perhaps they are not all integers?`, 400);
        }

        nums.sort(function (a, b) {
            return a - b;
        });
        console.log(nums);

        let median;
        if (nums % 2 === 0) {
            const mid1 = nums[nums.length / 2];
            const mid2 = nums[nums.length / 2 - 1];
            median = (mid1 + mid2) / 2;
            return res.status(200).json({
                'median': median
            });
        } else {
            median = nums[Math.floor(nums.length / 2)];
            return res.status(200).json({
                'median': median
            });
        };
    } catch (err) {
        next(err);
    };
});


//route to find mode of nums
app.get('/mode', function (req, res, next) {
    try {
        let nums = req.query.nums.split(',');
        nums = nums.map(num => parseInt(num));
        if (nums.includes(NaN)) {
            throw new ExpressError(`Cannot find median of ${req.query.nums}. Perhaps they are not all integers?`, 400);
        }
        console.log(nums);
        let mode = {};
        for(let num of nums) {
            console.log(num);
            if(num in mode) {
                mode[num] ++;
            } else {
                mode[num] = 1;
            }
        }
        return res.status(200).json({
            mode
        });
    } catch (err) {
        next(err);
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


//start app
app.listen(3000, function () {
    console.log('App on port 3000');
});