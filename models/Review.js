const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    productUsed: String,
    rating: Number,
    review: String,
    consent: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
