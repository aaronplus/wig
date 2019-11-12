const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 587,
secure: false, // upgrade later with STARTTLS
auth: {
  user: 'testtalentelgia@gmail.com',
  pass: 'talentelgia'
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
