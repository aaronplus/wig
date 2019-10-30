const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const passport = require("passport");
const users = require("./routes/api/users");
const contacts = require("./routes/api/contacts");
const schedule = require("./routes/api/schedule");
const campaign = require("./routes/api/campaign");
const cors = require('cors')
const User = require('./models/User');
const Message = require('./models/Message');
const PhoneNumber = require('./models/PhoneNumber');
const bcrypt = require("bcryptjs");

app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
//const db = require("./config/keys").mongoURI;
// Connect to MongoDB
const ip = 'localhost';
const portNumber = 27017;
const appDB = 'wig'
mongoose
  .connect(
    'mongodb://'+ip+':'+portNumber+'/'+appDB,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/contacts", contacts);
app.use("/api/schedule", schedule);
app.use("/api/campaign", campaign);
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));


// Seeding

var email = "admin@wig.com";
var password = "123456"
User.findOne({ email: email }).then(user => {
    if (user) {
      console.log("Admin exists");
    } else {
      const newUser = new User({
        first_name: 'Admin',
        last_name: 'Admin',
        email,
        password
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => console.log("Admin added"))
            .catch(err => console.log(err));
        });
      });
    }
  });

  // Message Seeder
  Message.countDocuments({}, function( err, count){
    console.log(err, count);
    if (count == 0) {
      const newMessage = [{
        name: Math.random().toString(36).substring(5),
        message: Math.random().toString(36).substring(2)
      },{
        name: Math.random().toString(36).substring(5),
        message: Math.random().toString(36).substring(2)
      },{
        name: Math.random().toString(36).substring(5),
        message: Math.random().toString(36).substring(2)
      }];
      Message.insertMany(newMessage, function(error, docs) {
        console.log(error, docs);

      });
    }
})

// Phone Number Seeder
PhoneNumber.countDocuments({}, function( err, count){
  console.log(err, count);
  if (count == 0) {
    const newRecord = [{
      name: 'first',
      type: 'twilio',
      phone_number: '+61 447 725 755',
      voice_forward_number: 'PN25062b26f66d4b00242375354009819a'
    },{
      name: 'second',
      type: 'twilio',
      phone_number: '+61 427 287 920',
      voice_forward_number: 'PN5959bb608ccf2e743b2f33d213b99558'
    }];
    PhoneNumber.insertMany(newRecord, function(error, docs) {
      console.log(error, docs);

    });
  }
})
