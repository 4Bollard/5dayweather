const apiKey = "4e1d5b509e438ede30086a826dc5b20d"
const city = $('#city')
const button = $('.action')
const form = $('.form') 

let cityNames = JSON.parse(localStorage.getItem("cityNames")) || [];



function locationPull() {
    const locationApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city.val()}&appid=${apiKey}`
    fetch(locationApi) 
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data[0].lat)
            console.log(data[0].lon) 
            const lat = data[0].lat
            const lon = data[0].lon
            weatherPull(lat , lon)
            cityNames.push(data[0].name);
            localStorage.setItem("cityNames", JSON.stringify(cityNames));
            removeDoubles()
            }
        ); 
}

function removeDoubles() {
    cityNames = cityNames.filter( (name, i) => !cityNames.includes(name, i+1))
    localStorage.setItem("cityNames" , JSON.stringify(cityNames))
    console.log(cityNames)
};

function buttonMaker() {
    console.log("buttonmaker", cityNames)
    for (let i = 0; i < cityNames.length; i++) {
    let button = $("<button>").text(cityNames[i]).attr("id", cityNames[i]).addClass("hButtons").appendTo($(".history"));
    
}
};

function weatherPull(lat , lon) {
    console.log(lat, lon)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`) 
    .then(response => response.json())
    .then(data => {
        console.log(data) 
        saveToStorage(data)          
        dataPopulate();    }
    );
    
}

function readLocalStorage() {
    let string = localStorage.getItem("city");
    let cityWeather = JSON.parse(string) || [];
    return cityWeather;
}

function saveToStorage(cityWeather) {
    let saveData = JSON.stringify(cityWeather);
    localStorage.setItem("city", saveData);
}


function dataPopulate() {
    const weather = readLocalStorage()
    const cityName = $("<h1>").text(city.val()).appendTo($(".today"));
    const today = $("<div>").addClass("superDuper").appendTo($(".today"));
    const date = $("<p>").text(dayjs.unix(weather.list[0].dt).format("MM/DD/YYYY")).appendTo(today);
    const temp = $("<p>").text(`Temp:${weather.list[0].main.temp}`).appendTo(today);
    const wind = $("<p>").text(`Wind:${weather.list[0].wind.speed}/mph`).appendTo(today);
    const humidity = $("<p>").text(`Humidity:${weather.list[0].main.humidity}%`).appendTo(today);
    
    for (let i = 1; i < weather.list.length; i+=7) {
        const forcast = $("<div>").addClass("superDuper").appendTo($(".forcast"));
        const date = $("<p>").text(dayjs.unix(weather.list[i].dt+86400).format("MM/DD/YYYY")).appendTo(forcast);
        const temp = $("<p>").text(`Temp:${weather.list[i].main.temp}`).appendTo(forcast);
        const wind = $("<p>").text(`Wind:${weather.list[i].wind.speed}/mph`).appendTo(forcast);
        const humidity = $("<p>").text(`Humidity:${weather.list[i].main.humidity}%`).appendTo(forcast);
        
    }
};





form.on("click", ".action", function(e){
    e.preventDefault()
    locationPull();
    console.log(city.val())
    $('.today').empty()
    $('.forcast').empty()
    
});

buttonMaker();

// local storage holding most recent searches



$(".history").on("click", ".hButtons", function(e){
    e.preventDefault()
    const cityName = $(this).attr("id");
    $('.today').empty()
    $('.forcast').empty()
    const locationApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    const clickedCityName = $("<h1>").text(cityName).appendTo($(".today"));
    fetch(locationApi)
    .then(response => {
        return response.json()
    }). then(function(data){
        const lat = data[0].lat
        const lon = data[0].lon
        localStorage.setItem("city", JSON.stringify(data))
        weatherPull(lat , lon)
    })
})




// const action = document.getElementById("myBtn");
// action.addEventListener("click", localStorage.setItem(key, value));


