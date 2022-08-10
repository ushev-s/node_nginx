const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Log = require('../models/Log');

// @route GET api/logs
// @desc Get All logs
// @access Private
router.get('/', async (req, res) => {
  try {
    const allLogs = await Log.find({}).sort({
      date: -1,
    });

    return res.json(allLogs);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

// @route POST api/logs
// @desc Create log
// @access Public
router.post(
  '/',
  [check('message', 'Please set message').isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message } = req.body;

    try {
      const log = new Log({ message });
      await log.save();

      return res.json('Log created successfully');
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
