'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.list_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem in listing the information to the database.");
    res.status(200).json(user);
  });
};

exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      return res.status(500).send("There was a problem creating the information to the database.");
    res.status(200).json(user);
  });
};

exports.read_a_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem reading the information to the database.");
    res.status(200).json(user);
  });
};

exports.update_a_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem updating the information to the database.");
    res.status(200).json(user);
  });
};

exports.delete_a_user = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem removing the information to the database.");
    res.status(200).json({ message: 'User successfully deleted' });
  });
};
