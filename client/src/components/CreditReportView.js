import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreditReport.css';

const CreditReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/latest');
        setReport(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch report');
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <div className="loading">Loading report...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!report) return <div className="no-data">No report available</div>;

  return (
    <div className="credit-report">
      <section className="report-section basic-details">
        <h2>Basic Details</h2>
        <div className="details-grid">
          <div className="detail-item">
            <label>Name</label>
            <span>{report.basicDetails.name}</span>
          </div>
          <div className="detail-item">
            <label>Mobile</label>
            <span>{report.basicDetails.mobilePhone}</span>
          </div>
          <div className="detail-item">
            <label>PAN</label>
            <span>{report.basicDetails.pan}</span>
          </div>
          <div className="detail-item credit-score">
            <label>Credit Score</label>
            <span>{report.basicDetails.creditScore}</span>
          </div>
        </div>
      </section>

      <section className="report-section summary">
        <h2>Report Summary</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <label>Total Accounts</label>
            <span>{report.reportSummary.totalAccounts}</span>
          </div>
          <div className="summary-item">
            <label>Active Accounts</label>
            <span>{report.reportSummary.activeAccounts}</span>
          </div>
          <div className="summary-item">
            <label>Closed Accounts</label>
            <span>{report.reportSummary.closedAccounts}</span>
          </div>
          <div className="summary-item">
            <label>Current Balance</label>
            <span>₹{report.reportSummary.currentBalanceAmount.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <label>Secured Amount</label>
            <span>₹{report.reportSummary.securedAccountsAmount.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <label>Unsecured Amount</label>
            <span>₹{report.reportSummary.unsecuredAccountsAmount.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <label>Recent Enquiries</label>
            <span>{report.reportSummary.last7DaysEnquiries}</span>
          </div>
        </div>
      </section>

      <section className="report-section accounts">
        <h2>Credit Accounts Information</h2>
        <div className="accounts-grid">
          {report.creditAccounts.map((account, index) => (
            <div key={index} className="account-card">
              <div className="account-header">
                <h3>{account.bankName}</h3>
                <span className={`card-tag ${account.creditCards === 'Yes' ? 'credit-card' : 'other'}`}>
                  {account.creditCards === 'Yes' ? 'Credit Card' : 'Other Account'}
                </span>
              </div>
              <div className="account-details">
                <div className="detail-row">
                  <label>Account Number</label>
                  <span>{account.accountNumber}</span>
                </div>
                <div className="detail-row">
                  <label>Current Balance</label>
                  <span>₹{account.currentBalance.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <label>Amount Overdue</label>
                  <span className="overdue">₹{account.amountOverdue.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <label>Address</label>
                  <span className="address">{account.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CreditReport;