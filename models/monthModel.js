const mongoose = require('mongoose');

const monthSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
            required: true
        },
        monthNumber: {
            type: Number,
            required: true
        },
        days: {
            type: Array,
            required: true
        }
    }
);

module.exports = mongoose.model('Month', monthSchema, 'days_collection');
