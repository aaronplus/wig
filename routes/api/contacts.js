const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const csvtoJson=require('csvtojson');
const multer = require('multer');
const validateContactInput = require("../../validation/contact");
const validateToken = require("../validateToken").validateToken;
const Campaign = require('../../models/Campaign');
const Contact = require('../../models/Contact');
const stringify = require('csv-stringify');

const email = require('../../config/email');
const { Parser } = require('json2csv');
const moment = require('moment');

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
  let { page, limit, filters} = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  let skip = (page == 1)? 0 : page * limit;

  var matchQry = {
    userId:mongoose.Types.ObjectId(userId)
  }
  if (filters) {
    var filterParams = JSON.parse(filters);
    if (filterParams.propertyCity) {
        matchQry['propertyCity'] = {$in:filterParams.propertyCity};
    }
    if (filterParams.propertyState) {
      matchQry['propertyState'] = {$in:filterParams.propertyState};
    }
    if (filterParams.campaign) {
      matchQry['campaign'] = {$in:filterParams.campaign.map((rec)=>{
        return mongoose.Types.ObjectId(rec);
      })};
    }
  }


  console.log(skip,limit);
  console.log(matchQry);
  let contacts = await Contact.aggregate([
    {
      $match:{
        ...matchQry
      }
    },
    {$lookup: {
    from:"campaigns",
    localField: "campaign",
    foreignField: "_id",
    as: "campaign_info"
   }
 },
 { "$limit": parseInt(skip + limit) },
 { "$skip": parseInt(skip) },
 {
   $unwind: '$campaign_info'
 }
  ]);

// Get Count
var contactCount = await Contact.count(matchQry);
var skipContactCount = await Contact.count(Object.assign({},matchQry,{skippedDate:{$exists: true}}));
var campaignCount = await Campaign.count(matchQry);








  return res.json({results:contacts,countObj:{contactCount,skipContactCount,campaignCount}});
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
   // console.log(JSON.stringify(qry));

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
  let groupId =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
    // console.log(e);
    return res.status(500).json({error: "Error in save Campaign"});
  }
}else {
  var campaignId = req.body.campaign;
}

// var fileData = new Promise((resolve, reject) => {
//   fs.createReadStream(req.body.fileObj.path)
//     .pipe(csv({
//       //mapHeaders: ({ header, index }) => headers.push(header)
//     }))
//     .on('data', (data) => fileRows.push(data))
//     .on('end', () => {
//       resolve(fileRows)
//       // return res.json({headers, fileObj:req.file});
//     })
//     .on('error', (err) => {
//       reject(err)
//     });
// });
//
//
// var fileRows = await fileData;

var fileObj = JSON.parse(req.body.fileObj);
const csvFilePath=path.join(__dirname, '../..', fileObj.path);
const fileRows=await csvtoJson().fromFile(csvFilePath);



//return res.json(fileRows);
var fileHeader;
var headers = JSON.parse(req.body.headers);
var rowData = [];

global.socket.emit('import_status', {total:fileRows.length,skip:req.body.skipTraced});
var insertedCount = 0;
var updatedCount = 0;
var skippedCount = 0;
//skipTraced
if (req.body.skipTraced) {
  var promises = fileRows.map((row,index)=>{
    if (index % 100 === 0) {
      global.socket.emit('import_status_progress', {total:fileRows.length, index});
    }
    let data = {};

    data['lastNameOne'] = row[`${headers['lastName']}`] || row['INPUT_LAST_NAME'];
    data['propertyAddress'] = row[`${headers['propertyAddress']}`] || row['INPUT_ADDRESS_LINE1'];

    let uniqueStr = data['propertyAddress'].concat(data['lastNameOne']);
    data['internal'] = uniqueStr.replace(/[^A-Z0-9]/ig, "");
    data['userId'] = mongoose.Types.ObjectId(userId);
    data['groupId'] = groupId;
  //  data['campaign'] = campaignId._id? mongoose.Types.ObjectId(campaignId._id): mongoose.Types.ObjectId(campaignId);
    // data['firstNameOne'] = row[`${headers['firstName']}`] || row['INPUT_FIRST_NAME'];
    // data['propertyCity'] = row[`${headers['propertyCity']}`] || row['INPUT_ADDRESS_CITY'];
    // data['propertyState'] = row[`${headers['propertyState']}`] || row['INPUT_ADDRESS_STATE'];
    // data['propertyZipCode'] = row[`${headers['propertyZip']}`] || row['INPUT_ADDRESS_ZIP'];

    data['skippedDate'] = moment();
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


    return Contact.update({internal: data['internal']}, {...data}, function (err, affected, resp) {
      if (err) {
        return res.status(500).json({'error': err});
      }
      if (affected.n >= 1 && affected.nModified > 0) {
        updatedCount++;
      }

      return affected;
      });
  });
  Promise.all(promises).then(function(results) {
    // console.log(results);
    global.socket.emit('import_status_success', {total:fileRows.length, insertedCount,updatedCount,skippedCount, index:fileRows.length});
    return res.json({message: 'Updated successfully', groupId});
 })

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

       var percent = 1;
       var promises = fileRows.map((row,index)=>{
         let filePercent = Math.ceil((fileRows.length*percent)/100);
         if (index == filePercent) {
           global.socket.emit('import_status_progress', {total:fileRows.length, index});
           percent = parseInt(percent) + 10;
         }

         let data = {};
         data['lastNameOne'] = row[`${headers['lastName']}`] || row['OWNER 1 LAST NAME'];
         data['propertyAddress'] = row[`${headers['propertyAddress']}`] || row['SITUS STREET ADDRESS'];

         let uniqueStr = data['propertyAddress'] ? data['propertyAddress'].concat(data['lastNameOne']): '';
         data['internal'] = uniqueStr.replace(/[^A-Z0-9]/ig, "");
         data['userId'] = mongoose.Types.ObjectId(userId);
        // data['internal'] = row['MAILING_STREET_ADDRESS'] || row['MAILING STREET ADDRESS'];
         data['campaign'] = campaignId._id? mongoose.Types.ObjectId(campaignId._id): mongoose.Types.ObjectId(campaignId);
         data['firstNameOne'] = row[`${headers['firstName']}`] || row['OWNER 1 FIRST NAME'];

         data['groupId'] = groupId;
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
         // data['skippedDate']='';
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


         if (data['internal']) {
           return Contact.findOneAndUpdate({internal: data['internal']}, data, {upsert: true, new: true,rawResult:true, useFindAndModify:true}, function(err, row){
             if (err) {
               return err;
             }
             if (row.lastErrorObject.updatedExisting) {
               updatedCount++;
             }else {
               insertedCount++;
             }

             return row;
           }).catch(function(err){
             console.log(err);
             return err;
           });
         }



       });

       Promise.all(promises).then(function(results) {
         console.log(results);
         global.socket.emit('import_status_success', {total:fileRows.length, insertedCount,updatedCount,skippedCount, index:fileRows.length});
          return res.json({data:results, message: 'Imported successfully', groupId});
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
  var headers = [];
  fs.createReadStream(req.file.path)
    .pipe(csv({
      mapHeaders: ({ header, index }) => headers.push(header)
    }))
    .on('data', (data) => fileRows.push(data))
    .on('end', () => {
      return res.json({headers, fileObj:req.file});
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

/*
**************
@route: POST api/contacts/send_to_export
@description: Send exported data to email
@access: Private
**************
*/

router.post('/send_to_export', validateToken, async function (req, res, next) {
  var userId = req.decoded.id;
  var groupId = req.body.groupId;
  if (!groupId) {
    return res.status(400).json({message:'groupId param is required'});
  }
  let contacts = await Contact.find({userId: mongoose.Types.ObjectId(userId), groupId}, {
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
 });

 var exportedData = [
   'First Name', 'Last Name', 'Mail Address', 'Mail City', 'Mail State', 'Mail Zip', 'Property Address', 'Property City', 'Property State', 'Property Zip'
 ];

 const fields = [{
   label: 'OWNER FIRST NAME',
   value: 'firstNameOne'
 },{
   label: 'OWNER LAST NAME',
   value: 'lastNameOne'
 },
 {
   label: 'MAILING STREET ADDRESS',
   value: 'mailingAddress'
 },
 {
   label: 'MAIL CITY',
   value: 'mailingCity'
 },
 {
   label: 'MAIL STATE',
   value: 'mailingState'
 },
 {
   label: 'MAIL ZIP CODE',
   value: 'mailingZipCode'
 },
 {
   label: 'SITUS STREET ADDRESS',
   value: 'propertyAddress'
 },
 {
   label: 'SITUS CITY',
   value: 'propertyCity'
 },
 {
   label: 'SITUS STATE',
   value: 'propertyState'
 },
 {
   label: 'SITUS ZIP CODE',
   value: 'propertyZipCode'
 }
];

 const json2csvParser = new Parser({ fields });
 const csv = json2csvParser.parse(contacts);

  //Write file to csv
  fs.writeFile('uploads/export.csv', csv, 'utf8', async function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
    return res.status(500).json({message:'Error in Exporting Data'});
  } else{
    console.log('It\'s saved!');
    var mailOptions = {
      from: 'bhushanlal972@gmail.com',
      to: process.env.ADMIN_EMAIL,
      subject: 'Exported data for Skip Traced',
      text: 'Hi Admin, Please find the attached exported file for the skip traced',
      attachments:[
        {   // utf-8 string as an attachment
              filename: 'export_data.csv',
              path: 'uploads/export.csv'
        }
      ]
    };

    try {
      await email.sendEmail(mailOptions);
      return res.json({'message': 'Mail sent successfully'});
    } catch (e) {
      console.log(e);
      return res.status(500).json({message:'Error in sending email'});
    }
  }
});
});

/*
**************
@route: GET api/contacts/getFilters
@description: Get list of the the filters required
@access: Private
**************
*/

router.get('/getFilters', validateToken, async function(req, res, next){
  var userId = req.decoded.id;
  try {
    let cityFilter = await Contact.find({userId:mongoose.Types.ObjectId(userId)}).distinct('propertyCity');
    let stateFilter = await Contact.find({userId:mongoose.Types.ObjectId(userId)}).distinct('propertyState');
    return res.json({cityFilter,stateFilter});
  } catch (e) {
    console.log(e);
    return res.status(400).json({message: "Error in fetching filters"})
  }


});




// -> Import CSV File to MongoDB database
// function importCsvData2MongoDB(filePath){
//     csv()
//         .fromFile(filePath)
//         .then((jsonObj)=>{
//             console.log(jsonObj);
//             /**
//              [
//                 { _id: '1', name: 'Jack Smith', address: 'Massachusetts', age: '23' },
//                 { _id: '2', name: 'Adam Johnson', address: 'New York', age: '27' },
//                 { _id: '3', name: 'Katherin Carter', address: 'Washington DC', age: '26' },
//                 { _id: '4', name: 'Jack London', address: 'Nevada', age: '33' },
//                 { _id: '5', name: 'Jason Bourne', address: 'California', age: '36' }
//              ]
//             */
//             // Insert Json-Object to MongoDB
//             // MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
//             //     if (err) throw err;
//             //     let dbo = db.db("gkzdb");
//             //     dbo.collection("customers").insertMany(jsonObj, (err, res) => {
//             //        if (err) throw err;
//             //        console.log("Number of documents inserted: " + res.insertedCount);
//             //        /**
//             //            Number of documents inserted: 5
//             //        */
//             //        db.close();
//             //     });
//             // });
//
//             fs.unlinkSync(filePath);
//         })
// }

module.exports = router;
