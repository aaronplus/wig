const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ContactSchema = new Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    internal: {
        type: String,
        required: true,
        unique : true,
        dropDups: true
    },
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Campaign is Required"]
    },
    firstNameOne: {
        type: String,
        required: false
    },
    lastNameOne: {
        type: String,
        required: [true," Last name is required"]
    },
    correctPhone: {
        type: String,
        required: false
    },
    firstNameTwo: {
        type: String,
        required: false
    },
    lastNameTwo: {
        type: String,
        required: false
    },
    mailingName: {
        type: String,
        required: false
    },
    occupancy: {
        type: String,
        required: false
    },
    ownershipType: {
        type: String,
        required: false
    },
    mailingAddress: {
        type: String,
        required: false
    },
    mailingCity: {
        type: String,
        required: false
    },
    mailingState: {
        type: String,
        required: false
    },
    mailingZipCode: {
        type: String,
        required: false
    },
    mailingCounty: {
        type: String,
        required: false
    },
    propertyAddress: {
        type: String,
        required: [true, "Property Address is required"]
    },
    propertyCity: {
        type: String,
        required: [true, "Property City is required"]
    },
    propertyState: {
        type: String,
        required: [true, "Property State is required"]
    },
    propertyZipCode: {
        type: String,
        required: [true, "Property zip is required"]
    },
    propertyCounty: {
        type: String,
        required: false
    },
    apn: {
        type: String,
        required: false
    },
    equityValue: {
        type: String,
        required: false
    },
    equityPercentage: {
        type: String,
        required: false
    },
    estimatedValue: {
        type: String,
        required: false
    },
    recordingDateOT: {
        type: Date,
        required: false
    },
    salePriceOT: {
        type: String,
        required: false
    },
    deedTypeOT: {
        type: String,
        required: false
    },
    recordingDateLMS: {
      type: Date,
      required: false
    },
    salePriceLMS: {
      type: String,
      required: false
    },
    deedTypeLMS: {
      type: String,
      required: false
    },
    dateOfBirth: {
      type: String,
      required: false
    },
    dateOfDeath: {
      type: String,
      required: false
    },
    extraAddressOne: {
      type: String,
      required: false
    },
    extraCityOne: {
      type: String,
      required: false
    },
    extraStateOne: {
      type: String,
      required: false
    },
    extraZipCodeOne: {
      type: String,
      required: false
    },
    extraAddressTwo: {
      type: String,
      required: false
    },
    extraCityTwo: {
      type: String,
      required: false
    },
    extraStateTwo: {
      type: String,
      required: false
    },
    extraZipCodeTwo: {
      type: String,
      required: false
    },
    extraAddressThree: {
      type: String,
      required: false
    },
    extraCityThree: {
      type: String,
      required: false
    },
    extraStateThree: {
      type: String,
      required: false
    },
    extraZipCodeThree: {
      type: String,
      required: false
    },
    phoneOne: {
      type: String,
      required: false
    },
    phoneOneType: {
      type: String,
      required: false
    },
    phoneOneScore: {
      type: String,
      required: false
    },
    phoneTwo: {
      type: String,
      required: false
    },
    phoneTwoType: {
      type: String,
      required: false
    },
    phoneTwoScore: {
      type: String,
      required: false
    },
    phoneThree: {
      type: String,
      required: false
    },
    phoneThreeType: {
      type: String,
      required: false
    },
    phoneThreeScore: {
      type: String,
      required: false
    },
    phoneFour: {
      type: String,
      required: false
    },
    phoneFourType: {
      type: String,
      required: false
    },
    phoneFourScore: {
      type: String,
      required: false
    },
    phoneFive: {
      type: String,
      required: false
    },
    phoneFiveType: {
      type: String,
      required: false
    },
    phoneFiveScore: {
      type: String,
      required: false
    },
    phoneSix: {
      type: String,
      required: false
    },
    phoneSixType: {
      type: String,
      required: false
    },
    phoneSixScore: {
      type: String,
      required: false
    },
    phoneSeven: {
      type: String,
      required: false
    },
    phoneSevenType: {
      type: String,
      required: false
    },
    phoneSevenScore: {
      type: String,
      required: false
    },
    phoneEight: {
      type: String,
      required: false
    },
    phoneEightType: {
      type: String,
      required: false
    },
    phoneEightScore: {
      type: String,
      required: false
    },
    phoneNine: {
      type: String,
      required: false
    },
    phoneNineType: {
      type: String,
      required: false
    },
    phoneNineScore: {
      type: String,
      required: false
    },
    phoneTen: {
      type: String,
      required: false
    },
    phoneTenType: {
      type: String,
      required: false
    },
    phoneTenScore: {
      type: String,
      required: false
    },
    gfHash: {
      type: String,
      required: false
    },
    dateAdded: {
      type: Date,
      required: false
    },
    thapp: {
      type: Number,
      required: false
    },
    xenCall: {
      type: Number,
      required: false
    },
    RVM: {
      type: Number,
      required: false
    },
    callRail: {
      type: Number,
      required: false
    },
    FB: {
      type: Number,
      required: false
    },
    IG: {
      type: Number,
      required: false
    },
    currentStatus: {
      type: String,
      required: false
    },
    skippedDate: {
      type: Date,
      required: false
    },
    Qualifier: {
      type: String,
      required: false
    },
    Acquisitions: {
      type: String,
      required: false
    },
    followUpDate: {
      type: Date,
      required: false
    },
    followUpCount: {
      type: Number,
      required: false
    },
    markedDeadDate: {
      type: String,
      required: false
    },
    MAOAmount: {
      type: String,
      required: false
    },
    MAOStatus: {
      type: String,
      required: false
    },
    MAORequestDate: {
      type: Date,
      required: false
    },
    MAOApprovedDate: {
      type: Date,
      required: false
    },
    offerCreatedDate: {
      type: Date,
      required: false
    },
    offerSentDate: {
      type: Date,
      required: false
    },
    offerViewedDate: {
      type: Date,
      required: false
    },
    offerSignedDate: {
      type: Date,
      required: false
    },
    Market: {
      type: String,
      required: false
    },
    marketExport: {
      type: Date,
      required: false
    },
    sellerLead: {
      type: Date,
      required: false
    },

});
module.exports = Contact = mongoose.model("contacts", ContactSchema);
