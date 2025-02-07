# CreditSea-Assignment

A MERN stack application for analyzing credit reports from Experian XML data, providing detailed credit information display and analysis.

## Project Overview

This application processes XML files containing soft credit pull data from Experian, extracts relevant information, and presents it in a clean, organized format. The system includes:
- XML file upload functionality 
- Data extraction and MongoDB storage
- Clean, responsive frontend display

## Features

- XML file upload and validation
- Credit report data extraction including:
  - Basic Details (Name, Mobile, PAN, Credit Score)
  - Report Summary (Account totals, Balances) 
  - Credit Account Information
- Responsive design for all devices
- MongoDB data persistence
- RESTful API endpoints

## Tech Stack

- **MongoDB** - Database
- **Express** - Backend framework  
- **React** - Frontend framework
- **Node.js** - Runtime environment
- Additional libraries:
  - `xml2js` - XML parsing
  - `mongoose` - MongoDB object modeling
  - `multer` - File upload handling
  - `axios` - HTTP client
  
## Installation

### 1. Clone the repository
```bash
git clone https://github.com/AtulGarg2204/creditsea.git
cd creditsea
```

### 2. Install backend dependencies
```bash
cd server
npm install
```

### 3. Install frontend dependencies
```bash
cd client
npm install
```

### 4. Configuration
Create a `.env` file in the server directory:
```plaintext
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```
Ensure MongoDB is running on your system.

### 5. Running the Application

#### Start the backend server:
```bash
cd server
npm run dev
```

#### Start the frontend application:
```bash
cd client
npm start
```

Access the application at `http://localhost:3000`

## API Endpoints

### Upload XML File
**POST** `/api/upload`
- Accepts an XML file through form-data
- Returns processed credit report data

### Get Latest Report
**GET** `/api/latest`
- Returns the most recently uploaded credit report

## Project Structure
```plaintext
creditsea/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.js
│   │   │   └── CreditReportView.js
│   │   ├── App.js
│   │   └── index.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── CreditReport.js
│   ├── routes/
│   │   └── creditReportRoutes.js
│   ├── controllers/
│   │   └── creditReportController.js
│   └── server.js
└── README.md
```

## Data Model

### Credit Report Schema
```javascript
{
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
}
```

## Error Handling
The application includes error handling for:
- Invalid file formats
- Upload failures
- Data processing errors
- API request failures

## Development Notes

- Backend runs on port `5000`
- Frontend runs on port `3000`
- MongoDB connection configured via environment variables
- Supports XML file format only

## License

This project is licensed under the ISC License.

