const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

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

// schema.post('remove', function(message) {
//   User.findById(message.user, function(err, user) {
//     user.messages.pull(message);
//     user.save();
//   })
// })

// schema.post('save', function(message) {
//   console.log(message);
//   console.log(this);
//   User.findById(message.user, function(err, user) {
//     user.messages.push(message);
//     user.save();
//   })
// })


module.exports = mongoose.model('Message', schema);
