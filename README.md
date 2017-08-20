
# In a new directory, run npm init, and follow along with the prompts, giving your app the name of ‘mongouserrestapi’ 

npm init

# You’re going to use Express as your framework, MongoDB as the database, and a package called body-parser to help deal with JSON requests.

npm install --save express mongodb body-parser mongoose

#I also highly recommend installing Nodemon as a dev dependency. It’s a simple little package that automatically restarts your server when files change.

npm install --save-dev nodemon

#Your complete package.json should look like this:

// package.json

{
  "name": "mongouserrestapi",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js"
  },
  "author": "prabhatiitbhu@gmail.com",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.17.2",
    "express": "^4.15.4",
    "mongodb": "^2.2.31",
    "mongoose": "^4.11.7"
  },
  "devDependencies": {
    "nodemon": "^1.11.0"
  }
}

#Create a file called server.js - touch server.js.
#In this server, we will writing the protocols to create our server.

touch server.js

#Create a folder called api 
#Inside this folder called api, create three separate folders called models, routes, and controllers by running 

mkdir api
mkdir api/controllers 
mkdir api/models 
mkdir api/routes

#Create UserController.js in the api/controller folder, UserRoutes.js in the routes folder, and UserModel.js in the model folder - 

touch api/controllers/UserController.js api/models/UserModel.js api/routes/UserRoutes.js

#open the UserModel.js file in your api/models folder and type the following code into the file and save.

// UserModel.js

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

#To do this, open the UserRoutes.js file in the route folder and paste the code snippet below into

//UserRoutes.js

'use strict';
module.exports = function(app) {
  var user = require('../controllers/UserController');

  // user Routes
  app.route('/users')
    .get(user.list_all_users)
    .post(user.create_a_user);


  app.route('/users/:userId')
    .get(user.read_a_user)
    .put(user.update_a_user)
    .delete(user.delete_a_user);
};

#Open UserController.js file with your text editor( Sublime, Atom e.t.c) and let’s deep dive into coding.

#In this controller, we would be writing five(5) different functions namely: list_all_users, create_a_user, read_a_user, update_a_user, delete_a_user. We will exported each of the functions for us to use in our routes.
Each of these functions uses different mongoose methods such as find, findById, findOneAndUpdate, save and remove.

// UserController.js

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



#Open the server.js file created awhile ago and follow the following steps to put everything together.
#Essentially, you will be replacing the code in your server.js with the code snippet from this section

#Connect your database by adding a url to the mongoose instance connection
#Load the created model - user
#Install bodyParser and use
#bodyParser Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
#It exposes various factories to create middlewares. All middlewares will populate the req.bodyproperty with the parsed body, or an empty object ({}) if there was no body to parse (or an error was returned).
#Register our created routes in the server

#The easiest way to set up a Mongo database is through mLab: it’s free for the smallest size, and quite fast to setup.
#Once you create an account and a MongoDB deployment, add a user to the database with a username and password , And in a directory config in the root of your project, create a db.js file.

mkdir config 
cd config
touch db.js

// db.js
module.exports = {
  url : 'mongodb://<dbuser>:<dbpassword>@ds151433.mlab.com:51433/userrestapi'
};

#  change your dbuser , dbpassword and database url in db.js 


// server.js

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/UserModel'), //created model loading here
  db = require('./config/db');
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(db.url, { useMongoClient: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/UserRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('User RESTful API server started on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

# completed code 

git clone https://github.com/prabhatpankaj/mongouserrestapi.git


