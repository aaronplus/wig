const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const validateContactInput = require("../../validation/contact");
const validateToken = require("../validateToken").validateToken;
const Campaign = require('../../models/Campaign');

const upload = multer({ dest: 'uploads/' });
// Load Contact model


// @route POST api/contacts/upload
// @desc Upload contacts by csv
// @access Private, validateToken

router.post('/upload', validateToken, upload.single('file'), async function (req, res, next) {
  var userId = req.decoded.id;
  const { errors, isValid } = validateContactInput(Object.assign({}, req.body, req.file));
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

// Create Campaign
let campaign = req.body.campaign;
var campaignId;
  try {
    campaignId = await new Campaign({campaign,userId: mongoose.Types.ObjectId(userId)}).save();
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: "Error in save Campaign"});
  }

  var fileRows = [], fileHeader;
   fs.createReadStream(req.file.path)
     .pipe(csv())
     .on('data', (data) => fileRows.push(data))
     .on('end', () => {

       // Create contacts
       // var rowData = [];
       // fileRows.each(row,index=>{
       //   let data = {};
       //   data['internal'] = ;
       //   data['campaign'] = ;
       //
       // });










       return res.json({"Headers":Object.keys(fileRows[0]), fileRows});
     });
});
// -> Import CSV File to MongoDB database
function importCsvData2MongoDB(filePath){
    csv()
        .fromFile(filePath)
        .then((jsonObj)=>{
            console.log(jsonObj);
            /**
             [
                { _id: '1', name: 'Jack Smith', address: 'Massachusetts', age: '23' },
                { _id: '2', name: 'Adam Johnson', address: 'New York', age: '27' },
                { _id: '3', name: 'Katherin Carter', address: 'Washington DC', age: '26' },
                { _id: '4', name: 'Jack London', address: 'Nevada', age: '33' },
                { _id: '5', name: 'Jason Bourne', address: 'California', age: '36' }
             ]
            */
            // Insert Json-Object to MongoDB
            // MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            //     if (err) throw err;
            //     let dbo = db.db("gkzdb");
            //     dbo.collection("customers").insertMany(jsonObj, (err, res) => {
            //        if (err) throw err;
            //        console.log("Number of documents inserted: " + res.insertedCount);
            //        /**
            //            Number of documents inserted: 5
            //        */
            //        db.close();
            //     });
            // });

            fs.unlinkSync(filePath);
        })
}

module.exports = router;
