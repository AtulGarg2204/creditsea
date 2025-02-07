const xml2js = require('xml2js');
const CreditReport = require('../models/CreditReport');

exports.uploadXML = async (req, res) => {
    try {
      const parser = new xml2js.Parser({ explicitArray: false });
      const xmlData = await parser.parseStringPromise(req.file.buffer.toString());
      const profile = xmlData.INProfileResponse;
      
      // Access the correct nested properties
      const basicDetails = profile.Current_Application.Current_Application_Details;
      const caisAccount = profile.CAIS_Account;
      const caisSummary = caisAccount.CAIS_Summary;
      const firstAccountDetails = caisAccount.CAIS_Account_DETAILS[0];
  
      const creditReport = new CreditReport({
        basicDetails: {
          name: `${basicDetails.Current_Applicant_Details.First_Name} ${basicDetails.Current_Applicant_Details.Last_Name}`,
          mobilePhone: basicDetails.Current_Applicant_Details.MobilePhoneNumber,
          pan: caisAccount.CAIS_Account_DETAILS[0].CAIS_Holder_Details.Income_TAX_PAN,
          creditScore: parseInt(profile.SCORE.BureauScore)
        },
        reportSummary: {
          totalAccounts: parseInt(caisSummary.Credit_Account.CreditAccountTotal),
          activeAccounts: parseInt(caisSummary.Credit_Account.CreditAccountActive),
          closedAccounts: parseInt(caisSummary.Credit_Account.CreditAccountClosed),
          currentBalanceAmount: parseInt(caisSummary.Total_Outstanding_Balance.Outstanding_Balance_All),
          securedAccountsAmount: parseInt(caisSummary.Total_Outstanding_Balance.Outstanding_Balance_Secured),
          unsecuredAccountsAmount: parseInt(caisSummary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured),
          last7DaysEnquiries: parseInt(profile.TotalCAPS_Summary.TotalCAPSLast7Days)
        },
        creditAccounts: caisAccount.CAIS_Account_DETAILS.map(account => ({
          creditCards: account.Account_Type === '10' ? 'Yes' : 'No',
          bankName: account.Subscriber_Name.trim(),
          address: `${account.CAIS_Holder_Address_Details?.First_Line_Of_Address_non_normalized || ''} ${account.CAIS_Holder_Address_Details?.Second_Line_Of_Address_non_normalized || ''} ${account.CAIS_Holder_Address_Details?.Third_Line_Of_Address_non_normalized || ''}`.trim(),
          accountNumber: account.Account_Number,
          amountOverdue: parseInt(account.Amount_Past_Due) || 0,
          currentBalance: parseInt(account.Current_Balance) || 0
        }))
      });
  
      await creditReport.save();
      res.status(201).json({ 
        message: 'Report created successfully',
        data: creditReport 
      });
    } catch (error) {
      console.error("Error in uploadXML:", error);
      res.status(500).json({ error: error.message });
    }
  };

exports.getLatestReport = async (req, res) => {
  try {
    const report = await CreditReport.findOne().sort({ _id: -1 });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};