require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs(process.env.MONGO_URL);
const days_collection = db.collection('days');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/month-data', function(req, res, next) {
  const {monthNumber, year} = req.body;
  db.days_collection.find({monthNumber: monthNumber, year: year}, function (err, docs) {
    res.send(docs);
  });
});

router.post('/store-day-data', function(req, res, next) {
  const {checked, dayNumber, monthNumber, year} = req.body;

  db.days_collection.update(
      {dayNumber: dayNumber, monthNumber: monthNumber, year: year},
      {$set: {dayNumber: dayNumber, monthNumber: monthNumber, year: year, checked: checked}},
      {upsert: true},
      function (err, docs) {
        res.send(err);
      }
      );

});

module.exports = router;
