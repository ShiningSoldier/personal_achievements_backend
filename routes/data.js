require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs(process.env.MONGO_URL);
const days_collection = db.collection('days');
const dataController = require('../controllers/dataController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/month-statistics', dataController.monthStatistics);

router.post('/store-day-data', dataController.storeDayData);

router.post('/get-specific-day', dataController.getSpecificDay);

module.exports = router;
