const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 465,
secure: false, // upgrade later with STARTTLS
auth: {
  user: 'accounts@innsite.com.au',
  pass: 'Social112//++'
}
});

module.exports = {
  sendEmail: (mailOptions) => {
    var promise = new Promise((resolve,reject) =>{
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info);
        }
      });
    });
    return promise;
  }
};
