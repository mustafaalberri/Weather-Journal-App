# Weather-Journal App Project

## Table of Contents

* [Overview](#overview)
* [Support](#support)
* [Installation](#installation)
* [How to Run The App](#how-to-run-the-app)
* [Technologies Used](#technologies-used)
* [Authors and Acknowledgment](#authors-and-acknowledgment)
* [References](#references)

## Overview
The purpose of this project is to create an app that takes in user input (zipcode) and user response (feelings), and then gets the most recent weather data according to the zipcode by utilizing the OpenWeatherMap API. The default country that appears when loaded is the United States of America, but this can be changed by clicking the 'Change Country' button and entering your country. The app will give you an alert if it was provided with an invalid country or zipcode. The data displayed to the user are the date, temperature, and user response, accompanied by an icon that describes the weather.

## Support
Please contact Mustafa Alberri: (E-mail) *mustafaalberri@gmail.com*, or (Mobile Number) **+201027660306** for support.

## Installation
In order to run this project, you need to have the following installed in your computer: 
- `Node.js`: [Installation](https://nodejs.org/en/download/)
- `npm` package manager is installed automatically with `node.js`.
- Using `npm` package manager install `http-server` as a package dependency by running the following line in your command line: `npm install http-server`. 
- Finally, you need to have a web browser installed.

## How to Run The App
To run the app, follow these steps:
1. Open a command line window, navigate to the project folder, then navigate inside the 'website' folder.
2. When inside the 'website' folder, from the command line, run the following line: `'http-server -p3000'` (make sure you have `http-server` package installed).
3. Open a new tab (or window) of the command line, then run the server file using the line: `'node server.js'`. (make sure you already have `nodeJS` installed).
4. Open a web browser, and go to: `localhost:3000`.
5. The app should be running, and you should be able to get the latest weather data.

## Technologies Used
The technologies used in the creation of the app are: Javascript ES6, HTML, CSS, Node.js.

## Authors and Acknowledgment
The HTML and CSS base files were provided by [Udacity](udacity.com) (link: https://github.com/udacity/fend/tree/refresh-2019). 
Creation of the Client and Server Javascript program, and editing of the HTML and CSS files to create the app was done by Mustafa Alberri.

## References
- I obtained the list of countries and corresponding country codes from: [Dirask](https://dirask.com/posts/JavaScript-list-of-ISO-3166-country-codes-prwyAj)
