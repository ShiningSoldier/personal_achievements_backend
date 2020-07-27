require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs(process.env.MONGO_URL);
const dataController = require('../controllers/dataController');

router.post('/month-statistics', dataController.monthStatistics);

router.post('/store-day-data', dataController.storeDayData);

router.post('/get-specific-day', dataController.getSpecificDay);

module.exports = router;
