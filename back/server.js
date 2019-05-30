// Imports 
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')

// Getting all routes
const routes = require("./src/routes/index")

require('dotenv').config();

// Server port
const PORT = process.env.PORT || 3031;

// Instantiate server
const app = express();

app.use(morgan("dev"));

// Body Parser configuration
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Sending to the right routes
app.use("/excuses", routes.excuses)
app.use("/api/transport", routes.transport)

app.get("/", (req, res) => {
  res.send("Hi, I'm on the root '/'")
})

// Launch Server
let server = app.listen(PORT, () => {
  console.log("Listening port n°", server.address().port);
});

// https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=rerd_sncf&exclude_replies=true
