var admin = require('firebase-admin'); 

var serviceAccount = require(__dirname + '/nsnoais-firebase-adminsdk-lfea3-7b05ec1c42.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

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

Parse.Cloud.define('hello', req => {
  // Parse.Cloud.run('sendFCMNotification', {
  //   title: 'Say hi',
  // })
  req.log.info(req);
  return 'Hi';
});

Parse.Cloud.define('sendFMCNotification', async (req) => {
  const { title, body, tokens, link } = req.params

  if (!title) throw new Error("Title is required");
  if (!body) throw new Error("Body is required");
  if (tokens.length == 0) throw new Error('Tokens are required');

  let message = {
    notification: {
      title: title,
      body: body,
      click_action: 'https://localhost:8080'
    }
  }

  if (link) message.notification.click_action = link
  try {
    const { failureCount, successCount } = await admin.messaging().sendToDevice(token, message, {priority: high});
    console.log('Successfully send the notification to ${successCount} device (${failureCount} failed')
  }catch (err) {
    console.log('An error occured while connecting to Firebase')
  }
});
