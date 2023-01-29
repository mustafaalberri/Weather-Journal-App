/* Global Variables */
const apiKey = '&appid=e627aebbf71d357d969cab419077a6c8&units=imperial';
const directURL = 'http://api.openweathermap.org/geo/1.0/zip?zip=';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=';
let latitude, longitude;
let countryCode = 'US';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;

//
const updateInterface = async () => {
  // Get the values entered by the user for zipcode and feelings
  const feels = document.getElementById('feelings').value;
  const zip = document.getElementById('zip').value;
  try{
  // Use OpenWeatherMapAPI Geocoding to get latitude/longitude of the area corresponding to the zipcode
  let data = await retrieveData(directURL + zip + ',' + countryCode + apiKey);
  latitude = data.lat;
  longitude = data.lon;
  // Get the current wearther conditions for the retrieved coordinates 
  data = await retrieveData(weatherURL + latitude + '&lon=' + longitude + apiKey);
  // Post the retrieved data to the server by passing the appropriate URL, and an object containing
  // the temperature, date, and user response for feelings
  data = await postData('/allData', {temp: data.main.temp, date: newDate, userResponse: feels});
  // Get the data from the server by passing the appropriate URL
  data = await retrieveData('/getWeatherData');
  // Update HTML elements with the new data retrieved from the server
  updateHTML(data);
  }catch(error){
    console.log('error', error);
    alert('Invalid ZipCode'); // Alert the user
  }
} 

// Alternative method with the same functionality as the previous method,
// but, it uses '.then' instead of 'await'.
/*const updateInterfaceAlt = () => { 
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

// 
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
    const newData = await response.json();
    return newData;   // 
  }catch(error){
    console.log("error", error);
  }
}

// 
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
   // appropriately handle the error
  }
}

//
const updateHTML = (data) => {
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(data.temp) + ' degrees';
  document.getElementById('content').innerHTML = data.userResponse;
  document.getElementById("date").innerHTML =data.date;
}

//
document.getElementById('generate').addEventListener('click', updateInterface);
