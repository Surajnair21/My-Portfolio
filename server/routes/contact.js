const express = require('express')
const router = express.Router()

let Contact
try {
  Contact = require('../models/Contact')
} catch (e) {}

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Save to MongoDB if available
    if (Contact) {
      const entry = new Contact({
        name,
        email,
        message,
        ip: req.ip,
      })
      await entry.save()
    }

    console.log(`📨 New contact from ${name} <${email}>`)
    res.status(201).json({ success: true, message: 'Message received. Thank you!' })
  } catch (err) {
    console.error('Contact route error:', err)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

module.exports = router
