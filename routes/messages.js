const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Message = require('../models/message');

router.get('/', function(req, res, next) {
  Message.find()
    .populate('user', 'firstName')
    .exec((err, messages) => {
        if (err) {
          return res.status(500).json({
            title:'An error occurred',
            error: err
          });
        }
        res.status(200).json({
          message: 'Success',
          obj: messages
        });
    });
});

router.use('/', function(req, res, next){
  jwt.verify(req.query.token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: err
      });
    }
    next();
  });
});

router.post('/', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(err, user){
    if (err) {
      return res.status(500).json({
        title:'An error occurred',
        error: err
      });
    }
    var message = new Message({
      content: req.body.content,
      user: user
    });
    // save to database
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title:'An error occurred',
          error: err
        });
      }
      // user.messages.push(result);
      // user.save();
      res.status(201).json({
        message: 'Saved message',
        obj: result
      })
    });
  });
});

router.patch('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);

  Message.findById(req.params.id, function(err, message){
    if (err) {
      return res.status(500).json({
        title:'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title:'Message not found',
        error: { message: 'Message not found' }
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: 'Not authenticated'
      });
    }
    message.content = req.body.content;
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title:'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated message',
        obj: result
      });
    });
  });

})

router.delete('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message){
    if (err) {
      return res.status(500).json({
        title:'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title:'Message not found',
        error: { message: 'Message not found' }
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: 'Not Authenticated'
      });
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title:'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      })
    })
  });
})
module.exports = router;
