const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mortgageSchema = new Schema({
startDate: {type: Date},
loanAmount: {type: Number},
interestRate: {type: Number},
Year: {type: Number},
user_id: {type: Number}
});

const Mortgage = mongoose.model('mortgage', mortgageSchema);

module.exports = Mortgage

