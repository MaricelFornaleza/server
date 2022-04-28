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

async function sendEmail(params = {}) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'chednstpserialnumber@gmail.com',
      pass: 'chednstpserialnumber2022',
    },
  });

  // send mail with defined transport object
  if (params.type == "Account") {
    let info = await transporter.sendMail({
      from: '"CHEDRO V NSTP" <chednstpserialnumber@gmail.com>', // sender address
      to: params.email, // list of receivers
      subject: "Account Credential", // Subject line
      text: "Email:" + params.email + "\n Password: " + params.password, // plain text body
    }); 
  }
  if (params.type == "Contact") {
    let info = await transporter.sendMail({
      from: '"CHEDRO V NSTP" <chednstpserialnumber@gmail.com>', // sender address
      to: 'lykaccasilao@gmail.com', // list of receivers
      subject: "Message", // Subject line
      text: params.message, // plain text body
    });
  }

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
 
Parse.Cloud.define("accountCredential", async (request) => {
if (params.approved) {
sendEmail(request.params).then(function () {
    return 'ok'
  }, (error) => {
    console.log(error)
    throw new Error(error)
  })
}
});

Parse.Cloud.define("contactForm", async (request) => {
if (params.approved) {
sendEmail(request.params).then(function () {
  return 'ok'
}, (error) => {
  console.log(error)
  throw new Error(error)
})
}
});
