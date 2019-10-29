const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const passport = require("passport");
const users = require("./routes/api/users");
const contacts = require("./routes/api/contacts");
const cors = require('cors')
const User = require('./models/User');
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
