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
const Contact = require('../../models/Contact');
const stringify = require('csv-stringify');

const upload = multer({ dest: 'uploads/' });
// Load Contact model


/*
**************
@route: GET api/contacts/list
@description: Get list of the contacts
@access: Private
**************
*/

router.get('/list', validateToken, async function(req, res, next){
  var userId = req.decoded.id;
  let contacts = await Contact.find({userId:mongoose.Types.ObjectId(userId)});
  return res.json(contacts);
});

/*
@route: POST api/contacts/export
@description: Export list of the contacts
@access: Private
*/
router.post('/export', validateToken, function(req, res, next){
   var userId = req.decoded.id;
   var campaignId = req.body.campaign;
   var filename   = "contacts.csv";
   var dataArray;
   Contact.find({userId:mongoose.Types.ObjectId(userId)}, function(err, contacts) {
       if (err) res.send(err);
                 // adding appropriate headers, so browsers can start downloading
          // file as soon as this request starts to get served
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Pragma', 'no-cache');

          // ta-da! this is cool, right?
          // stringify return a readable stream, that can be directly piped
          // to a writeable stream which is "res" (the response object from express.js)
          // since res is an abstraction over node http's response object which supports "streams"
          stringify(contacts, { header: true })
          .pipe(res);
   });
});

// @route POST api/contacts/upload
// @desc Upload contacts by csv
// @access Private, validateToken

router.post('/upload', validateToken, upload.single('file'), async function (req, res, next) {
  var userId = req.decoded.id;
  // const { errors, isValid } = validateContactInput(Object.assign({}, req.body, req.file));
  // // Check validation
  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }
// Create Campaign
let campaign = req.body.campaign;
if (req.body.campaignType == 'new') {
  var campaignId;
  try {
    campaignId = await new Campaign({campaign,userId: mongoose.Types.ObjectId(userId)}).save();
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: "Error in save Campaign"});
  }
}else {
  var campaignId = req.body.campaign;
}




  var fileRows = JSON.parse(req.body.csvData), fileHeader;
   // fs.createReadStream(req.file.path)
   //   .pipe(csv())
   //   .on('data', (data) => fileRows.push(data))
   //   .on('end', () => {
       /*Create contacts*/
       var rowData = [];
       fileRows.map((row,index)=>{
         let data = {};
         data['userId'] = mongoose.Types.ObjectId(userId);
         data['internal'] = row['MAILING_STREET_ADDRESS'] || row['MAILING STREET ADDRESS'];
         data['campaign'] = mongoose.Types.ObjectId(campaignId._id);
         data['firstNameOne'] = '';
         data['lastNameOne'] = '';
         data['correctPhone'] = '';
         data['firstNameTwo'] = '';
         data['lastNameTwo'] = '';
         data['mailingName'] = row['OWNER_MAILING_NAME'] || row['OWNER MAILING NAME'];
         data['occupancy'] = '';
         data['ownershipType'] = '';
         data['mailingAddress'] = row['MAILING_STREET_ADDRESS'] || row['MAILING STREET ADDRESS'];
         data['mailingCity'] = row['MAIL_CITY'] || row['MAIL CITY'];
         data['mailingState'] = row['MAIL_STATE'] || row['MAIL STATE'];
         data['mailingZipCode'] = row['MAIL_ZIP'] || row['MAIL ZIP/ZIP+4'];
         data['mailingCounty'] = row['MAIL_COUNTRY'] || row['MAIL COUNTRY'];
         data['propertyAddress'] = row['SITUS_STREET_ADDRESS'] || row['SITUS STREET ADDRESS'];
         data['propertyCity'] = row['SITUS_CITY'] || row['SITUS CITY'];
         data['propertyState'] = row['SITUS_STATE'] || row['SITUS STATE'];
         data['propertyZipCode'] = row['SITUS_ZIP_CODE'] || row['SITUS ZIP CODE'];
         data['propertyCounty'] = '';
         data['apn'] = row['APN'] || row['APN - FORMATTED'];
         data['equityValue'] = row['EQUITY_VALUE'] || row['EQUITY VALUE'];
         data['equityPercentage'] = row['EQUITY_PERCENTAGE'] || row['EQUITY PERCENTAGE'];
         data['estimatedValue'] = '';
         data['recordingDateOT'] = row['OT_RECORDING_DATE'] || row['OT-RECORDING DATE'];
         data['salePriceOT'] = '';
         data['deedTypeOT'] = row['OT_DEED_TYPE'] || row['OT-DEED TYPE'];
         data['recordingDateLMS'] = '';
         data['salePriceLMS'] = row['LMS_SALE_PRICE'] || row['LMS-SALE PRICE'];
         data['deedTypeLMS'] = '';
         data['dateOfDeath'] = '';
         data['dateOfBirth'] = '';
         data['extraAddressOne'] = '';
         data['extraCityOne'] = '';
         data['extraStateOne'] = '';
         data['extraZipCodeOne'] = '';
         data['extraAddressTwo'] = '';
         data['extraCityTwo'] = '';
         data['extraStateTwo'] = '';
         data['extraZipCodeTwo'] = '';
         data['extraAddressThree'] = '';
         data['extraCityThree'] = '';
         data['extraStateThree']='';
         data['extraZipCodeThree']='';
         data['phoneOne']='';
         data['phoneOneType']='';
         data['phoneOneScore']='';
         data['phoneTwo']='';
         data['phoneTwoType']='';
         data['phoneTwoScore']='';
         data['phoneThree']='';
         data['phoneThreeType']='';
         data['phoneThreeScore']='';
         data['phoneFour']='';
         data['phoneFourType']='';
         data['phoneFourScore']='';
         data['phoneFive']='';
         data['phoneFiveType']='';
         data['phoneFiveScore']='';
         data['phoneSix']='';
         data['phoneSixType']='';
         data['phoneSixScore']='';
         data['phoneSeven']='';
         data['phoneSevenType']='';
         data['phoneSevenScore']='';
         data['phoneEight']='';
         data['phoneEightType']='';
         data['phoneEightScore']='';
         data['phoneNine']='';
         data['phoneNineType']='';
         data['phoneNineScore']='';
         data['phoneTen']='';
         data['phoneTenType']='';
         data['phoneTenScore']='';
         data['gfHash']='';
         data['dateAdded']='';
         data['thapp']='';
         data['xenCall']='';
         data['RVM']='';
         data['callRail']='';
         data['FB']='';
         data['IG']='';
         data['currentStatus']='';
         data['skippedDate']='';
         data['Qualifier']='';
         data['Acquisitions']='';
         data['followUpDate']='';
         data['followUpCount']='';
         data['markedDeadDate']='';
         data['MAOAmount']='';
         data['MAOStatus']='';
         data['MAORequestDate']='';
         data['MAOApprovedDate']='';
         data['offerCreatedDate']='';
         data['offerSentDate']='';
         data['offerViewedDate']='';
         data['offerSignedDate']='';
         data['Market']=row['Market_VALUE'] || row['Market VALUE'];
         data['marketExport']='';
         data['sellerLead']='';
         data['internal'] = data['internal'].replace(/[^A-Z0-9]/ig, "");
         rowData.push(data);
       });
       Contact.insertMany(rowData,function(err, docs){
        return res.json(docs);
       })











     // });
});
router.post('/uploadFile', upload.single('file'), async function (req, res, next) {
  var fileRows = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => fileRows.push(data))
    .on('end', () => {
      return res.json(fileRows);
    });




  //return res.json({message:"Save Successfully"});
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
