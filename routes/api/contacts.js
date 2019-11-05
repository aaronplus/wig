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
multer({
  limits: { fieldSize: 25 * 1024 * 1024 }
})
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
  let contacts = await Contact.aggregate([
    {
      $match:{
        userId:mongoose.Types.ObjectId(userId)
      }
    },
    {$lookup: {
    from:"campaigns",
    localField: "campaign",
    foreignField: "_id",
    as: "campaign_info"
   }
 },
 {
   $unwind: '$campaign_info'
 }
  ]);
  return res.json(contacts);
});

/*
@route: POST api/contacts/export
@description: Export list of the contacts
@access: Private
*/
router.post('/export', validateToken, function(req, res, next){
   var userId = req.decoded.id;
   var qry;
   if (Array.isArray(req.body.campaign) || req.body.propertyCity|| req.body.propertyState) {
     qry = {
       userId:mongoose.Types.ObjectId(userId)
     };
     if (req.body.campaign) {
       let campaignIds = req.body.campaign.map(item=>{
         return mongoose.Types.ObjectId(item);
       });
       qry['campaign'] = {
        $in: campaignIds
       }
     }
     if (req.body.propertyState) {
       qry['propertyState'] = {
         $in: req.body.propertyState
       }
     }
     if (req.body.propertyCity) {
       qry['propertyCity'] = {
         $in: req.body.propertyCity
       }
     }
   }else {
     var campaignId = req.body.campaign;
     qry = {userId:mongoose.Types.ObjectId(userId), campaign: mongoose.Types.ObjectId(campaignId)}
   }
   console.log(JSON.stringify(qry));

   var filename   = "contacts.csv";
   var dataArray;
   Contact.find(qry, {
    firstNameOne:1,
    lastNameOne:1,
    mailingAddress:1,
    mailingCity:1,
    mailingState:1,
    mailingZipCode:1,
    propertyAddress:1,
    propertyCity:1,
    propertyState:1,
    propertyZipCode:1
  },function(err, contacts) {
       if (err) res.send(err);
       return res.send(contacts);
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
    let checkIfAlreadyExists = await Campaign.findOne({campaign: campaign});
    if (checkIfAlreadyExists) {
      return res.status(400).json({message: "A campaign with this name exist. Please enter a different campaign name"});
    }else {
      campaignId = await new Campaign({campaign,userId: mongoose.Types.ObjectId(userId)}).save();
    }

  } catch (e) {
    console.log(e);
    return res.status(500).json({error: "Error in save Campaign"});
  }
}else {
  var campaignId = req.body.campaign;
}

var fileRows = JSON.parse(req.body.csvData), fileHeader;
var headers = JSON.parse(req.body.headers);
var rowData = [];
//skipTraced
if (req.body.skipTraced) {
  fileRows.map((row,index)=>{
    let data = {};

    data['lastNameOne'] = row[`${headers['lastName']}`] || row['INPUT_LAST_NAME'];
    data['propertyAddress'] = row[`${headers['propertyAddress']}`] || row['INPUT_ADDRESS_LINE1'];

    let uniqueStr = data['propertyAddress'].concat(data['lastNameOne']);
    data['internal'] = uniqueStr.replace(/[^A-Z0-9]/ig, "");
    data['userId'] = mongoose.Types.ObjectId(userId);
  //  data['campaign'] = campaignId._id? mongoose.Types.ObjectId(campaignId._id): mongoose.Types.ObjectId(campaignId);
    data['firstNameOne'] = row['INPUT_FIRST_NAME'];
    data['propertyCity'] = row[`${headers['propertyCity']}`] || row['INPUT_ADDRESS_CITY'];
    data['propertyState'] = row[`${headers['propertyState']}`] || row['INPUT_ADDRESS_STATE'];
    data['propertyZipCode'] = row[`${headers['propertyZip']}`] || row['INPUT_ADDRESS_ZIP'];

    data['phoneOne']= row['PHONE1_PHONE'];
    data['phoneOneType']=row['PHONE1_PHONE_TYPE'];
    data['phoneOneScore']=row['PHONE1_PHONE_SCORE'];
    data['phoneTwo']=row['PHONE2_PHONE'];
    data['phoneTwoType']=row['PHONE2_PHONE_TYPE'];
    data['phoneTwoScore']=row['PHONE2_PHONE_SCORE'];
    data['phoneThree']=row['PHONE3_PHONE'];
    data['phoneThreeType']=row['PHONE3_PHONE_TYPE'];
    data['phoneThreeScore']=row['PHONE3_PHONE_SCORE'];
    data['phoneFour']=row['PHONE4_PHONE'];
    data['phoneFourType']=row['PHONE4_PHONE_TYPE'];
    data['phoneFourScore']=row['PHONE4_PHONE_SCORE'];
    data['phoneFive']=row['PHONE5_PHONE'];
    data['phoneFiveType']=row['PHONE5_PHONE_TYPE'];
    data['phoneFiveScore']=row['PHONE5_PHONE_SCORE'];
    data['phoneSix']=row['PHONE6_PHONE'];
    data['phoneSixType']=row['PHONE6_PHONE_TYPE'];
    data['phoneSixScore']=row['PHONE6_PHONE_SCORE'];
    data['phoneSeven']=row['PHONE7_PHONE'];
    data['phoneSevenType']=row['PHONE7_PHONE_TYPE'];
    data['phoneSevenScore']=row['PHONE7_PHONE_SCORE'];
    data['phoneEight']=row['PHONE8_PHONE'];
    data['phoneEightType']=row['PHONE8_PHONE_TYPE'];
    data['phoneEightScore']=row['PHONE8_PHONE_SCORE'];
    data['phoneNine']=row['PHONE9_PHONE'];
    data['phoneNineType']=row['PHONE9_PHONE_TYPE'];
    data['phoneNineScore']=row['PHONE9_PHONE_SCORE'];
    data['phoneTen']=row['PHONE10_PHONE'];
    data['phoneTenType']=row['PHONE10_PHONE_TYPE'];
    data['phoneTenScore']=row['PHONE10_PHONE_SCORE'];

    //let campaign = campaignId._id? mongoose.Types.ObjectId(campaignId._id): campaignId;
    Contact.updateOne({internal: data['internal']}, data, {upsert: true}, function (err,docs) {
      if (err) {
        return res.status(500).json({'error': err});
      }else {
        //return res.status(200).json(docs);
      }

      });

    rowData.push(data);
  });
  return res.json({'message':'Updated Successfully'});
  // let campaign = campaignId._id? mongoose.Types.ObjectId(campaignId._id): campaignId;
  // Contact.updateMany({userId: mongoose.Types.ObjectId(userId), campaign: mongoose.Types.ObjectId(campaign)}, rowData, {$upsert: true}, function (err,docs) {
  //   if (err) {
  //     return res.status(500).json({'error': err});
  //   }else {
  //     return res.status(200).json(docs);
  //   }
  //
  //   });



  //Model.update({_id: id}, obj, {upsert: true}, function (err) {...});
}else {





   // fs.createReadStream(req.file.path)
   //   .pipe(csv())
   //   .on('data', (data) => fileRows.push(data))
   //   .on('end', () => {
       /*Create contacts*/

       var promises = fileRows.map((row,index)=>{
         let data = {};
         data['lastNameOne'] = row[`${headers['lastName']}`] || row['OWNER 1 LAST NAME'];
         data['propertyAddress'] = row[`${headers['propertyAddress']}`] || row['SITUS STREET ADDRESS'];

         let uniqueStr = data['propertyAddress'].concat(data['lastNameOne']);
         data['internal'] = uniqueStr.replace(/[^A-Z0-9]/ig, "");
         data['userId'] = mongoose.Types.ObjectId(userId);
        // data['internal'] = row['MAILING_STREET_ADDRESS'] || row['MAILING STREET ADDRESS'];
         data['campaign'] = campaignId._id? mongoose.Types.ObjectId(campaignId._id): mongoose.Types.ObjectId(campaignId);
         data['firstNameOne'] = row[`${headers['firstName']}`] || row['OWNER 1 FIRST NAME'];

         data['phoneOne'] = row['phoneOne'];
         data['correctPhone'] = '';
         data['firstNameTwo'] = row['FIRST_NAME_2'] || row['OWNER 2 FIRST NAME'];
         data['lastNameTwo'] = row['LAST_NAME_2'] || row['OWNER 2 LAST NAME'];
         data['mailingName'] = row['OWNER_MAILING_NAME'] || row['OWNER MAILING NAME'];
         data['occupancy'] = '';
         data['ownershipType'] = '';
         data['mailingAddress'] = row[`${headers['mailingAddress']}`] || '';
         data['mailingCity'] = row[`${headers['mailingCity']}`] || row['MAIL CITY'];
         data['mailingState'] = row[`${headers['mailingState']}`] || row['MAIL STATE'];
         data['mailingZipCode'] = row[`${headers['MAIL ZIP/ZIP 4']}`] || row['MAIL ZIP/ZIP+4'];
         data['mailingCounty'] = row['MAIL_COUNTRY'] || row['MAIL COUNTRY'];

         data['propertyCity'] = row[`${headers['propertyCity']}`] || row['SITUS CITY'];
         data['propertyState'] = row[`${headers['propertyState']}`] || row['SITUS STATE'];
         data['propertyZipCode'] = row[`${headers['propertyZip']}`] || row['SITUS ZIP CODE'];
         data['propertyCounty'] = '';
         data['apn'] = row[`${headers['APN - FORMATTED']}`] || row['APN - FORMATTED'];
         data['equityValue'] = row[`${headers['equityValue']}`] || row['EQUITY VALUE'];
         data['equityPercentage'] = row[`${headers['equityPercentage']}`] || row['EQUITY PERCENTAGE'];
         data['estimatedValue'] = '';
         data['recordingDateOT'] = row[`${headers['recordingDateOT']}`] || row['OT-RECORDING DATE'];
         data['salePriceOT'] = '';
         data['deedTypeOT'] = row[`${headers['deedTypeOT']}`] || row['OT-DEED TYPE'];
         data['recordingDateLMS'] = row[`${headers['LMS-RECORDING DATE']}`];
         data['salePriceLMS'] = row[`${headers['salePriceLMS']}`] || row['LMS-SALE PRICE'];
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
         data['phoneOne']= row['phoneOne'];
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

         rowData.push(data);
         return Contact.updateOne({internal: data['internal']}, data, {upsert: true}, function(err, row){
           if (err) {
             return err;
           }
           return row;
         });


       });

       Promise.all(promises).then(function(results) {
          return res.json(results);
      })



       // Contact.insertMany(rowData,function(err, docs){
       //   if (err) {
       //     if (campaignId._id) {
       //       Campaign.deleteOne({_id: mongoose.Types.ObjectId(campaignId._id)})
       //     }
       //
       //     return res.status(400).json(err)
       //   }
       //  return res.json(docs);
       // })



}







     // });
});
router.post('/uploadFile', upload.single('file'), async function (req, res, next) {
  var fileRows = [];
  fs.createReadStream(req.file.path)
    .pipe(csv({
      //mapHeaders: ({ header, index }) => header.toLowerCase()
    }))
    .on('data', (data) => fileRows.push(data))
    .on('end', () => {
      return res.json(fileRows);
    })
    .on('error', (err) => {
      return res.status(500).json({error: err});
    });




  //return res.json({message:"Save Successfully"});
});

/*
**************
@route: GET api/contacts/getSchema
@description: Get schema columns
@access: Public
**************
*/

router.get('/getSchema', async function (req, res, next) {
  var props = Object.keys(Contact.schema.paths);

  return res.json(props);
});

/*
**************
@route: GET api/contacts/getCounts
@description: Get counts for total contacts,campaigns,skipped Records
@access: Private
**************
*/

router.get('/getCounts', validateToken, async function (req, res, next) {
  var userId = req.decoded.id;
  try {
    var contactCount = await Contact.count({userId: mongoose.Types.ObjectId(userId)});
    var skipContactCount = await Contact.count({userId: mongoose.Types.ObjectId(userId), skippedDate:{$exists: true}});
    var campaignCount = await Campaign.count({userId: mongoose.Types.ObjectId(userId)});

  } catch (e) {
      return res.status(500).json({error: e, message: 'Error in getCounts api.'});
  }

  return res.json({contactCount,skipContactCount,campaignCount});
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
