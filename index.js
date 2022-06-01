
let weather = {
 transform: function (response){
  this.city = response.name;
  this.temp = response.main.temp;
  this.description = response.weather[0].description;
  this.icon = response.weather[0].icon
  this.humidity = response.main.humidity
 }
}
let inputElement = document.getElementById('input-el');
let searchButton = document.getElementById('search-el');
let cityElement = document.getElementById('city-el');
let imageElement = document.getElementById('img-el');
let celEl = document.getElementById('cel-el');
let descriptionElement = document.getElementById('description-el');
let humidityElement = document.getElementById('humidity-el');
let errorElement = document.getElementById('error-el');
let mainElement = document.querySelector('main');

//get user location weather the first a user visits the site
 function getUserLocation(){
 navigator.geolocation.getCurrentPosition(async function (position){
   let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=96865d91a8bef41af266096216d0052d`);
   let data = await response.json();
   weather.transform(data);
   render(weather);
   mainElement.style.opacity = '1';
 });
}
window.onload = getUserLocation();
//render to page
function render(weather){
 document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + weather.description + "')";
 cityElement.textContent = weather.city;
 celEl.textContent = weather.temp
 descriptionElement.textContent = weather.description
 humidityElement.textContent = weather.humidity
 imageElement.src = 'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png'
}


searchButton.addEventListener('click', search);

//search city weather function
async function search(){
 let value = inputElement.value
 if (value === ""){
  return;
 }
 inputElement.value = "";
 let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=96865d91a8bef41af266096216d0052d`);
 if (response.status != 200){
  render(weather);
  errorElement.textContent = `no result found for ${value}`
  return;
 }
 let data = await response.json();
 weather.transform(data)
 render(weather)
}
// https://openweathermap.org/img/wn/" + icon + "@2x.png
// "url('https://source.unsplash.com/1600x900/?" + description + "')";