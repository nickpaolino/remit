// require the Twilio module and create a REST client
const bodyParser = require("body-parser");
const cors = require("cors");

const configure = require("../services/configure.js");

module.exports = app => {
  // allows the React server on port 3000 access to GET and POST on the express server
  app.use(
    cors({
      origin: "http://localhost:3000"
    })
  );

  // bodyParser is required to get the Twilio webhook route working
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // route handler for an incoming SMS message
  app.post("/sms", (req, res) => {
    // this is the text message that is sent to the configured number
    const body = req.body.Body;

    const isSMS = req.body.notSMS ? false : true;

    console.log("is from SMS?", isSMS);

    console.log("Auth is:", req.body.auth);

    const googleId = req.body.auth.googleId;

    // get command response from MongoDB and save here to send back
    configure.sendResponse(body, googleId, res, isSMS);
  });

  app.post("/commands", (req, res) => {
    // this is the text message body
    const body = req.body;

    const googleId = req.body.auth.googleId;

    // create a command in the Mongo database
    configure.createCommand(body, googleId);

    // send a response to avoid a Heroku timeout and Twilio error
    res.send({ status: "creating command" });
  });
};
