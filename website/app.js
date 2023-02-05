/* Global Variables */
const apiKey = '&appid=e627aebbf71d357d969cab419077a6c8&units=imperial';
const directURL = 'http://api.openweathermap.org/geo/1.0/zip?zip=';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=';
let latitude, longitude;
let countryCode = 'US';

// document.cookie = 'cookie2=value2; SameSite=None; Secure'; 
// Uncomment the previous line if you get the 'SameSite' issue in your browser.

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;

// Calback function for the event when 'Generate' button is clicked.
const updateInterface = async (evt) => {
  evt.preventDefault();
  // Get the values entered by the user for zipcode and feelings.
  const feels = document.getElementById('feelings').value;
  const zip = document.getElementById('zip').value;
  try{
  // Use OpenWeatherMapAPI Geocoding to get latitude/longitude of the area corresponding to the zipcode.
  let data = await retrieveData(directURL + zip + ',' + countryCode + apiKey);
  latitude = data.lat;
  longitude = data.lon;
  // Get the current wearther conditions for the retrieved coordinates.
  data = await retrieveData(weatherURL + latitude + '&lon=' + longitude + apiKey);
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  console.log(data);
  // Post the retrieved data to the server by passing the appropriate URL, and an object containing
  // the temperature, date, and user response for 'feelings'.
  data = await postData('/allData', {temp: data.main.temp, date: newDate, userResponse: feels});
  // Get the data from the server by passing the appropriate URL.
  data = await retrieveData('/getWeatherData');
  // Update HTML elements with the new data retrieved from the server
  updateHTML(data, icon, description);
  }catch(error){
    console.log('error', error);
    alert('Invalid ZipCode'); // Alert the user
  }
} 

// Alternative method with the same functionality as the previous method,
// but, it uses '.then' instead of 'await'.
/*const updateInterfaceAlt = (evt) => { 
  evt.preventDefault();
  const feels = document.getElementById('feelings').value;
  const zip = document.getElementById('zip').value;
  //if (zip === null){throw new Error('zip code invalid');}
  retrieveData(directURL + zip + ',' + countryCode + apiKey)
  .then((data) => {
    latitude = data.lat;
    longitude = data.lon;
    retrieveData(weatherURL + latitude + '&lon=' + longitude + apiKey)
    .then((data) => {
      postData('/allData', {temp: data.main.temp, date: newDate, userResponse: feels})
      .then((data) => {
        retrieveData('/getWeatherData')
        .then((data) => {
          updateHTML(data);
        })
      })
    })
  }).catch((error) => {
    console.log("error", error);
  });
}*/

// Function for a 'POST' request to post on the side, takes input URL and object. 
const postData = async(url = '', data = {}) => {
  // Post the provided data object to the provided URL
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  })
  try{
    // Save the server side response in a variable and return it.
    const newData = await response.json();
    return newData;   // 
  }catch(error){
    console.log("error", error);
  }
}

// Function for a 'GET' request, takes a URL as input.
const retrieveData = async(url) =>{
  // Get the data needed from the provided URL
  const request = await fetch(url);
  try{
    // Transform into JSON
    const data = await request.json()
    return data;
  }
  catch(error){
    console.log("error", error);
  }
}

// Function to write updated data to DOM elements
const updateHTML = async (data, icon, description) => {
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const content = document.getElementById("content");
  const weatherIcon = document.getElementById('weather__icon');
  // Hide the old elements to update them.
  content.style.opacity = 0;
  temp.style.opacity = 0;
  date.style.opacity = 0;
  weatherIcon.style.opacity = 0;
  setTimeout(() => { // update elements after 0.5 to account for transition
    // Update 'innerHTML' values of elements.
    temp.innerHTML = Math.round(data.temp) + ' degrees';
    content.innerHTML = data.userResponse;
    date.innerHTML = data.date;
    // Code for updating the weather icon element.
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.alt = description;
  }, 500);
  // Making elements appear one after the other using setTimeOut().
  setTimeout(() => {weatherIcon.style.opacity = 1;}, 500);
  setTimeout(() => {date.style.opacity = 1;}, 1000);
  setTimeout(() => {temp.style.opacity = 1;}, 1500);
  setTimeout(() => {content.style.opacity = 1;}, 2000);
}

// Add event listener for the 'generate' button.
document.getElementById('generate').addEventListener('click', updateInterface);
