const mongoose = require('mongoose');

const CreditReportSchema = new mongoose.Schema({
  basicDetails: {
    name: String,
    mobilePhone: String,
    pan: String,
    creditScore: Number
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalanceAmount: Number,
    securedAccountsAmount: Number,
    unsecuredAccountsAmount: Number,
    last7DaysEnquiries: Number
  },
  creditAccounts: [{
    creditCards: String,
    bankName: String,
    address: String,
    accountNumber: String,
    amountOverdue: Number,
    currentBalance: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('CreditReport', CreditReportSchema);