var searchBtnEl = $("#search-btn");
var searchHistoryBtnEl = $("search-history-btn")
var date = moment().format('L');
var cityNameEl = $("#city-name")
var todayTempEl = $("#today-temp")
var todayWindEl = $("#today-wind")
var todayHumidity = $("#today-humidity")
var todayUVEl = $("#today-uv")
var todayUVBadgeEl = $("#today-uv-badge")
var h5El = $("h5")
var searchHistoryList = $("#search-history-list")
var searchBtnText = $("#text-box");
searchBtnEl.on("click", searchBtnRun);
$("search-history-list").on("click", ".search-history-btn", historyBtnRun)


// City search button 
function searchBtnRun(coordsSource) {
    var city = searchBtnText.val();
    var APIKey = "eef440075f231dabd98329edc16d0dae";

    console.log(city);
    var coordsSource = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

// Fetch API
    fetch(coordsSource)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {

        var lat = data.coord.lat
        console.log(lat);
        var lon = data.coord.lon
        console.log(lon);

        var finalAPI = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey

        fetch(finalAPI)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
            console.log(data);

        searchHistoryList.append(`<button type="button" class="btn btn-secondary search-history-btn my-2" id="`+ searchBtnText.val() + `">`+ searchBtnText.val() + `</button>`)    

    
            var icon = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
            console.log(icon);
            //city name icon
            var cityNameIconEl = $("#city-name-icon")
            cityNameIconEl.attr("src", icon)
            // city name
            var newCityName = city + "  (" + date + ")"
            cityNameEl.text(newCityName)
            // today temp
            var newTodayTemp = Math.floor(data.current.temp)
            console.log(newTodayTemp);
            todayTempEl.text("Temp: " + newTodayTemp + " °F")

            var newTodayWind = data.current.wind_speed
            console.log(newTodayWind);
            todayWindEl.text("Wind: " + newTodayWind + " MPH")

            var newTodayHumidity = data.current.humidity
            console.log(newTodayHumidity);
            todayHumidity.text("Humidity: " + newTodayHumidity + "%")
    
            var newTodayUV = data.current.uvi
            todayUVEl.text("UV Index: " + newTodayUV)
            
    for (i=0; i < h5El.length ; i++) {
   
        var daysToAdd = 1 + i
    
        var newForecastDay = moment().add(daysToAdd, "days").format("L")
    
        $(h5El[i]).text(newForecastDay);

        // forecast icon
        var forecastIconEl = $(".emoji")
        console.log(forecastIconEl);
    
        var forecastIconApi = data.daily[i].weather[0].icon
        console.log(forecastIconApi);
    
        var newForecastIcon = "http://openweathermap.org/img/wn/" + forecastIconApi + "@2x.png"
        console.log(newForecastIcon);
    
        $(forecastIconEl[i]).attr("src", newForecastIcon)

        // forecast temp
        var forecastTempEl = $(".temp")
        console.log(forecastTempEl)
    
        var forecastTempApi = data.daily[i].temp.day
        console.log(forecastTempApi);
    
        var newForecastTemp = "Temp: " + forecastTempApi + " °F"
        console.log(newForecastTemp);
    
        $(forecastTempEl[i]).text(newForecastTemp)

        // forecast wind
        var forecastWindEl = $(".wind")
        console.log(forecastWindEl)
    
        var forecastWindApi = data.daily[i].wind_speed
        console.log(forecastWindApi);
    
        var newForecastWind = "Wind: " + forecastWindApi + " MPH"
        console.log(newForecastWind);
    
        $(forecastWindEl[i]).text(newForecastWind)

        // forecast humidity
      var forecastHumidityEl = $(".humidity")
      console.log(forecastHumidityEl)
    
      var forecastHumidityApi = data.daily[i].humidity
      console.log(forecastHumidityApi);
    
      var newForecastHumidity = "Humidity: " + forecastHumidityApi + "%"
      console.log(newForecastHumidity);
    
      $(forecastHumidityEl[i]).text(newForecastHumidity)
    }
    
    searchBtnText.val("")
})
});   
    
}