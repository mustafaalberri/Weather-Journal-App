// Setup empty JS object to act as endpoint for all routes.
projectData = {temp: 0,
               date: '',
               userResponse: ''};

const allData = [];

// Require Express to run server and routes.
const express = require('express');

// Start up an instance of app.
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance.
const cors = require('cors');
app.use(cors());

// Initialize the main project folder.
app.use(express.static('website'));

// Setup Server.
const port = 3000;
app.listen(port, callbackFn)

// Callback Function for setting up the server.
function callbackFn(){
    console.log(`Server is up and running with port: ${port}`);
};

// Set up server side 'GET' request.
app.get('/getWeatherData', sendData);

// Callback Function for 'GET' request
function sendData(req, res){
    res.send(projectData);
}

// Set up server side 'POST' request.
app.post('/allData', saveData);

// Callback Function for 'POST' request
function saveData(req, res){
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData);
    console.log(projectData);
    allData.push(projectData);
}
