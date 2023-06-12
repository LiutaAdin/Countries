"use strict";

const searchBtn = document.querySelector(".search-btn");
const randomBtn = document.querySelector(".random-btn");
const countryInp = document.getElementById("country-inp");
const result = document.getElementById("result");

//Helper functions

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

//Country Name


const getCountry = function () {
    let countryValue = countryInp.value;
    let result = document.getElementById("result");
    let countryName = async function (country) {
        const res = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
        );

        const data = await res.json();

        try {
            if (!countryValue) throw new Error(`So empty...`);
            if (!data[0]) throw new Error(`Country does not exist! Try again!`);

            result.innerHTML = `
           <img src="${data[0].flags.svg}" class="flag-img">
           <div class="info">
           <h2>${data[0].name.common}</h2>
           <div class="data-info">
           <h4>Capital:</h4>
           <span>${data[0].capital[0]}</span>
           </div>
           
           <div class="data-info">
           <h4>Population:</h4>
           <span>${(data[0].population / 1000000).toFixed(1)} m</span>
                 </div>
                 
                 <div class="data-info">
                 <h4>Continent:</h4>
                 <span>${data[0].continents[0]}</span>
                 </div>
                 
                 <div class="data-info">
                 <h4>Currencies:</h4>
                 <span>${
                     data[0].currencies[Object.keys(data[0].currencies)].name
                 } - ${Object.keys(data[0].currencies)}</span>
                  </div>
                  
                  <div class="data-info">
                  <h4>Language:</h4>
                  <span>${
                      data[0].languages[Object.keys(data[0].languages)]
                  }</span>
                  </div>
              </div>`;
        } catch (err) {
            result.innerHTML = `<h3>${err.message}</h3>`;
        }
    };
    countryName(countryValue);
};

//Random country

const getRandomCountry = function () {
    let result = document.getElementById("result");
    const randomCountry = async function () {
        let all = await fetch(`https://restcountries.com/v3.1/all`);
        let data = await all.json();
        const randomData = data[random(0, data.length)];
        // console.log(data);

        try {
            result.innerHTML = `
            <img src="${randomData.flags.svg}" class="flag-img">
            <div class="info">
            <h2>${randomData.name.common}</h2>
            <div class="data-info">
            <h4>Capital:</h4>
            <span>${randomData.capital[0]}</span>
            </div>
            
            <div class="data-info">
            <h4>Population:</h4>
            <span>${(randomData.population / 1000000).toFixed(1)} m</span>
               </div>
               
               <div class="data-info">
               <h4>Continent:</h4>
               <span>${randomData.continents[0]}</span>
               </div>

               <div class="data-info">
               <h4>Currencies:</h4>
               <span>${
                   randomData.currencies[Object.keys(randomData.currencies)]
                       .name
               } - ${Object.keys(randomData.currencies)}</span>
               </div>
               
               <div class="data-info">
               <h4> Language:</h4>
               <span>${
                   randomData.languages[Object.keys(randomData.languages)]
               } </span>
               </div>
               </div>`;
        } catch (err) {
            result.innerHTML = `<h3>Something went wrong! Try again!</h3>`;
        }
    };
    randomCountry();
};

randomBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getRandomCountry();
    countryInp.value = "";
    countryInp.focus();
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getCountry();
    countryInp.value = "";
    countryInp.focus();
});

countryInp.addEventListener('submit', getCountry())
