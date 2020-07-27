const service = require('../services/dataService');

exports.monthStatistics = function (req, res) {
    service.getStatistics(req.body, res);
};

exports.storeDayData = function(req, res) {
    service.createOrUpdateMonth(req.body, res);
};

exports.getSpecificDay = function (req, res) {
    service.findSpecificDayData(req.body, res);
};
