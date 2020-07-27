require('dotenv').config();
const express = require('express');
const mongojs = require('mongojs');
const db = mongojs(process.env.MONGO_URL);
const days_collection = db.collection('days');

exports.monthStatistics = function (req, res) {
    const {year, monthNumber} = req.body;
    db.days_collection.find({monthNumber: monthNumber, year: year}, function (err, docs) {
        let countChecked = 0;
        let statistics;
        if (docs.length > 0) {
            docs.forEach(el => {
                if (el.checked === 1) {
                    countChecked = countChecked + el.checked;
                }
            });
        }

        if (countChecked === 0) {
            statistics = "You're eating too much sugar. Try to eat less.";
        } else if (countChecked > 0 && countChecked <= 15) {
            statistics = "Not so bad, but I'm pretty sure you can better!";
        } else if (countChecked < 28) {
            statistics = "You have a very good diet! Stay strong!"
        } else {
            statistics = "You have a really strong will.";
        }

        res.send({statistics: statistics});
    });
};

exports.storeDayData = function(req, res) {
    const {checked, dayNumber, monthNumber, year} = req.body;

    db.days_collection.update(
        {dayNumber: dayNumber, monthNumber: monthNumber, year: year},
        {$set: {dayNumber: dayNumber, monthNumber: monthNumber, year: year, checked: checked}},
        {upsert: true},
        function (err, docs) {
            res.send(err);
        });
};

exports.getSpecificDay = function (req, res) {
    const {dayNumber, monthNumber, year} = req.body;

    db.days_collection.findOne({dayNumber: dayNumber, monthNumber: monthNumber, year: year}, function (err, doc) {
        res.send(doc);
    })
};
