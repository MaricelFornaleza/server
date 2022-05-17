// Example express application adding the parse-server module to expose Parse
// compatible API routes.

const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const args = process.argv || [];
const test = args.some(arg => arg.includes('jasmine'));

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}
const config = {
  databaseURI: databaseUri || 'mongodb://localhost:36463/nstpdb',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'masterKey', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/api', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['_User', 'Application', 'NstpEnrollment', 'Notification'], // List of classes to support for query subscriptions
  },
  javascriptKey: "jsKey",
  accountLockout: {
    duration: 5,
    threshold: 3,
    unlockOnPasswordreset: true,
  },
  passwordPolicy: {
    doNotAllowUsername: true,
    maxPasswordHistory: 5
  },
  preventLoginWithUnverifiedEmail: true,
  enableAnonymousUsers: false,
  verifyUserEmails: true,
  emailVerifyTokenValidityDuration: 12 * 60 * 60,
  appName: 'ched',
  publicServerURL: 'http://localhost:1337/api',
  emailAdapter: {
    module: 'parse-smtp-template',
    options: {
      template: true,
      templatePath: "views/template.html",
      secure: true,
      port: 465,
      host: 'smtp.gmail.com',
      user: 'chednstpserialnumber@gmail.com',
      password: 'chednstpserialnumber2022',
      fromAddress: 'CHEDRO V NSTP <chednstpserialnumber@gmail.com>',
      confirmOptions: {
        subject: "Email Verification",
        body: "Please Verify your email address for CHED NSTP Serial Number Online Application System",
        btn: "Confirm Email",
      }

    }
  }

};
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app = express();

// Serve static assets from the /public folder
app.use('/', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/api';
if (!test) {
  const api = new ParseServer(config);
  app.use(mountPath, api);
}

// // Parse Server plays nicely with the rest of your web routes
// app.get('/', function (req, res) {
//   res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
// });

// // There will be a test page available on the /test path of your server url
// // Remove this before launching your app
// app.get('/test', function (req, res) {
//   res.sendFile(path.join(__dirname, '/public/test.html'));
// });

const port = process.env.PORT || 1337;
if (!test) {
  const httpServer = require('http').createServer(app);
  httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
  });
  // This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);
}

module.exports = {
  app,
  config,
};
