require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
const Month = require('../models/monthModel');

exports.getStatistics = async function({year, monthNumber}, res) {
    Month.find({monthNumber: monthNumber, year: year}).exec(function (err, docs) {
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
            statistics = "You eat too much sugar. Try to eat less.";
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

exports.createOrUpdateMonth = async function({checked, dayNumber, monthNumber, year}, res) {
    const monthExists = await Month.findOne({monthNumber: monthNumber, year: year}).exec(function (err, doc) {
        let newDays = [];
        let monthData;
        if (doc) {
            let existingDays = doc.days;
            if (existingDays.includes(dayNumber)) {
                newDays = existingDays.filter(function (value) {
                    return value !== dayNumber;
                });
            } else {
                existingDays.push(dayNumber);
                newDays = existingDays;
            }
            doc.days = newDays;
            doc.save(function (err, doc) {
                res.send(err ? err : doc);
            });
        } else {
            newDays = [dayNumber];
            monthData = new Month({
                year: year,
                monthNumber: monthNumber,
                days: newDays
            });
            monthData.save(function (err, doc) {
                res.send(err ? err : doc);
            });
        }
    });
};

exports.findSpecificDayData = async function({dayNumber, monthNumber, year}, res) {
    let checked = 0;
    Month.findOne({monthNumber: monthNumber, year: year, days: {$all: [dayNumber]}}).exec(function (err, doc) {
        if (doc) {
            checked = 1;
        }

        res.send({monthNumber: monthNumber, checked: checked});
    })
};

