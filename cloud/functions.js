Parse.Cloud.define('hello', req => {
  req.log.info(req);
  return 'Hi';
});

Parse.Cloud.define('asyncFunction', async req => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  req.log.info(req);
  return 'Hi async';
});

Parse.Cloud.beforeSave('Test', () => {
  throw new Parse.Error(9001, 'Saving test objects is not available.');
});

const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const transporterOptions = {host: "smtp.gmail.com",
port: 587,
secure: false, // true for 465, false for other ports
auth: {
  user: 'chednstpserialnumber@gmail.com',
  pass: 'chednstpserialnumber2022',
  },
}

async function sendEmail(params = {}) {
  let transporter = nodemailer.createTransport(transporterOptions);
  // point to the template folder
const handlebarOptions = {
  viewEngine: {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./views/'),
};

  // use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))
  // send mail with defined transport object
  if (params.type == "Account") {
    let info = await transporter.sendMail({
      from: '"CHED NSTP Serial Number" <chednstpserialnumber@gmail.com>', // sender address
      to: params.email, // list of receivers
      subject: "Account Credentials", // Subject line
      template: 'credential',
      context:{
        name: params.name,
        password: params.password
      }
    });
    
  }

  if (params.type == "Contact") {
    let info = await transporter.sendMail({
      from: '"CHEDRO V NSTP Serial Number" <chednstpserialnumber@gmail.com>', // sender address
      to: 'ched.help@gmail.com', // list of receivers
      subject: "NSTP Serial Number Inquiry", // Subject line
      template: "message",
      context: {
        province: params.province,
        name: params.name,
        email: params.email,
        message: params.message
        
      },
    
    });
  }

  if (params.type == "Notification") {
    let info = await transporter.sendMail({
      from: '"CHED NSTP Serial Number" <chednstpserialnumber@gmail.com>', // sender address
      to: params.email,
      subject: "Application Update: " + params.title,
      template: 'notification',
      context: {
        name: params.name,
        document: params.document,
        date: params.date

      }
    })
  }
  if (params.type == "Transmittal") {
    let info = await transporter.sendMail({
      from: '"CHED NSTP Serial Number" <chednstpserialnumber@gmail.com>', // sender address
      to: params.email,
      subject: "Application Update: " + params.title,
      template: 'letter',
      context: {
        name: params.name,
        dataApplied: params.dataApplied,
        schoolYear: params.schoolYear,
        serialNumber: params.serialNumber,
        noOfStudents: params.noOfStudents
      }
    })
  }

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  

  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
const approved = true;
Parse.Cloud.define("sendEmailNotification", async (request) => {
  if (approved) {
    sendEmail(request.params).then(function () {
      return 'ok'
    }, (error) => {
      console.log(error)
      throw new Error(error)
    })
  }
});
