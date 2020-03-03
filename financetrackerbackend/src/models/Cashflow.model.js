const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CashflowSchema = new Schema({
    month: {type: String, required: [true, 'Please add data']},
    incomes: {
        primaryIncome: Number,
        investmentIncome: Number,
        otherIncome: Number
    },
    expenses: [{
        name: String,
        category: String,
        amount: Number
    }],
    user_id: String,
});

const Cashflow = mongoose.model('Cashflow', CashflowSchema);

module.exports = Cashflow;