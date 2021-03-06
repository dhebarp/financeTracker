const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mortgageSchema = new Schema({
planName: String,
loanAmount: Number,
interestRate: Number,
loanDuration: Number,
user_id: String,
});

const Mortgage = mongoose.model('mortgage', mortgageSchema);

module.exports = Mortgage;

