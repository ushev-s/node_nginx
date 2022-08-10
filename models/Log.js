const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Log = mongoose.model('log', LogSchema);
