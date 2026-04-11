const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const filesDir = path.join(__dirname, '../files')

// GET /api/download/pdf
router.get('/pdf', (req, res) => {
  const filePath = path.join(filesDir, 'SurajNair_CV.pdf')
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'SurajNair_CV.pdf')
  } else {
    res.status(404).json({ error: 'CV PDF not found. Please upload SurajNair_CV.pdf to server/files/' })
  }
})

// GET /api/download/docx
router.get('/docx', (req, res) => {
  const filePath = path.join(filesDir, 'SurajNair_CV.docx')
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'SurajNair_CV.docx')
  } else {
    res.status(404).json({ error: 'CV DOCX not found. Please upload SurajNair_CV.docx to server/files/' })
  }
})

module.exports = router
