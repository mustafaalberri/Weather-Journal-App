// Setup empty JS object to act as endpoint for all routes
projectData = {temp: 0,
               date: 'kkk',
               userResponse: 'kkk'};

const allData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port, callbackFn)
function callbackFn(){
    console.log(`Server is up and running with port: ${port}`);
};

app.get('/getWeatherData', sendData);

function sendData(req, res){
    res.send(projectData);
}

app.post('/allData', saveData);

function saveData(req, res){
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData);
    console.log(projectData);
    allData.push(projectData);
}
