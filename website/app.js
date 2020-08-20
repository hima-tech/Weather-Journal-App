/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();


const clickButton = () => {
  const elements = {
    // using .value so the user can put his own value
    weatherID: document.querySelector("#zip").value,
    feelingsID: document.querySelector("#feelings").value,
  };
  // api key is my own key that give access to api
  const apiKey = `&APPID=782e9fb534edcbf1f9df17a8cbc12a13&units=metric'`;
  // thats the api and changed it to zip like you told me on the last review
  const api = `http://api.openweathermap.org/data/2.5/weather?zip=`;

  const tempo = `${elements.weatherID}`;
  elements.feelingsID;
  zipButton(api, tempo, apiKey).then((data) => {
    // using /add from the server.js
    postData("/add", {
      date: newDate,
      temp: data.main.temp,
      content: elements.feelingsID,
    });
    console.log(data);
    updateUI();
  });
};

const zipButton = async (api, wether, key) => {
  // fetch for handling the api of the temp website
  const tempAPI = await fetch(api+wether+key);
  // try and catch is kinda like the if statment if/else
  try {
    const data = await tempAPI.json();
    console.log(data);

    return data;
  } catch (err) {
    alert("their an error on the zip code of api location", err);
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("their is an error on the postData", error);
  }
};

// update UI async function so the interface get updated to the user when he click the button
const updateUI = async () => {
  const feelingID = document.querySelector("#feelings").value;
  const ui = await fetch("/all");
  try {
    const addData = await ui.json();
    // using innerHTML so the user can see the content on the webpage like date, temp and what he typed
    document.querySelector("#date").innerHTML = `date: ${addData.date}`;
    // using math.round so i have for example 20 not 20.9
    document.querySelector("#temp").innerHTML = `temprature: ${Math.round(
      addData.temp - 273.15
    )}°C`;
    document.querySelector(
      "#content"
    ).innerHTML = `my feelings is ${feelingID}`;
  } catch (error) {
    alert("their is an error on the updateUI", error);
  }
};


const generate = document.querySelector("#generate");

generate.addEventListener("click", clickButton);
