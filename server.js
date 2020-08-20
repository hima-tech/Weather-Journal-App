// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/

const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// cors is node.js package provide connect/express middleware (making request to load resources on the other servers)
const cors = require("cors");
const { request } = require("http");
app.use(cors());
// Initialize the main project folder

// choosing the site of the html, css and javascript files
app.use(express.static("website"));

// Setup Server
// giving my localhost a port number
const port = 8000;

const listn = () => {
  // console log the server localhost port (feedback to make sure everything working fine )
  console.log(`the port of the site is localhost:${port}`);
};

const server = app.listen(port, listn);

// GET route

const allData = (req, res) => {
  res.send(projectData);
};

app.get("/all", allData);
// POST route

const addData = (req, res) => {
  let data = req.body;
  console.log("server data", data);

  projectData.date = data.date;

  projectData.temp = data.temp;

  projectData.content = data.content;

  res.send(projectData);
};

app.post("/add", addData);
