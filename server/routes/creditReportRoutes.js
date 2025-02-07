const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadXML, getLatestReport } = require('../controllers/creditReportController');

const upload = multer({ storage: multer.memoryStorage() });

// Make sure the field name matches what you're sending from frontend
router.post('/upload', upload.single('file'), uploadXML);
router.get('/latest', getLatestReport);

module.exports = router;