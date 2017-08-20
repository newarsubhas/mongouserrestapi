'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter your name'
  },
  email: {
    type: String,
    required: 'Kindly enter your email'
  },
  password: {
    type: String,
    required: 'Kindly enter your password'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'verified']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Users', UserSchema);
