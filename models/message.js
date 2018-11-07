const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Message', schema);
