const nodemailer = require('nodemailer');

// create a transporter object using the SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_gmail_username',
    pass: 'your_gmail_password'
  }
});

// setup email data with unicode symbols
const mailOptions = {
  from: 'your_email_address',
  to: 'recipient_email_address',
  subject: 'Email Subject',
  text: 'Hello from Nodemailer!'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});