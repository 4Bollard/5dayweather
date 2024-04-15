const apiKey = "4e1d5b509e438ede30086a826dc5b20d"
const city = $('#city')
const locationApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
const button = $('.action')



// function readLocalStorage() {
//     let string = localStorage.getItem("tasks");
//     let taskList = JSON.parse(string) || [];
//     return taskList;
// }

// function saveToStorage() {
//     let saveData = JSON.stringify(taskList);
//     localStorage.setItem("tasks", saveData);
// }









function weatherPull(lat , lon) {
    console.log(lat, lon)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`) 
        .then(response => response.json())
        .then(data => {
            console.log(data)           
            }
        );
}

// weatherPull()

function locationPull() {
    fetch(locationApi) 
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data[0].lat)
            console.log(data[0].lon) 
            const lat = data[0].lat
            const lon = data[0].lon

            weatherPull(lat , lon)
            }
        );
}

//need to link button to run weather pull
button.on("click", function(e){
    e.preventDefault()
    locationPull();
    // saveToStorage()
});




// local storage holding most recent searches






// const action = document.getElementById("myBtn");
// action.addEventListener("click", localStorage.setItem(key, value));


