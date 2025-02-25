const apiKey = "44fd4603e48647b8995152728251802";

async function getWeather() {
    const city = document.getElementById("CityName_input").value;

    if (!city) {
        alert("please enter a city name !");
        return;
    }
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    try {

        const response = await fetch(url);
        const data = await response.json();
        let currentCondition = data.current.condition.text;

        if (data.error) {
            document.getElementById("WeatherResult").innerHTML = `<p>${data.error.message}</p>`;
        } else {

            let resultHtml = document.getElementById("WeatherResult").innerHTML = `
            <h2 style="text-align:center">${data.location.name}, ${data.location.country} </h2>
          <div id="current_weather">
            <img src="https:${data.current.condition.icon}" 
            style="object-fit: contain; align-items:center; padding-left:10px" alt="Weather Icon"></img>
            <div style="display:flex; flex-direction:column; text-align:center">  
            <p>Temperature: ${data.current.temp_c}°C</p><br>
            <p>Condition: ${data.current.condition.text}..</p>
             </div> 
            <div id="current_weather_details" style="display:flex; flex-direction: column;"> 
            <p>UV: ${data.current.uv} </p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_kph} kph</p>
            </div>
          </div> `;

            document.getElementById("WeatherResult").innerHTML = resultHtml
            if (currentCondition.toLowerCase().includes("cloud") || currentCondition.toLowerCase().includes("overcast")) {
                document.body.style.backgroundImage = "url('cloudy-day.jpg')";

            } else if (currentCondition.toLowerCase().includes("rain")) {
                document.body.style.backgroundImage = "url('rainy-day-2.jpg')";

            } else if (currentCondition.toLowerCase().includes("snow")) {
                document.body.style.backgroundImage = "url('snowy-day.jpg')";

            } else {
                document.body.style.backgroundImage = "url('sunny-day-3.jpg')";
            }
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

async function getWeather_of_Days() {
  const city = document.getElementById("CityName_input").value;
    if (!city) {
        alert("please enter a city name !");
        return;
    }
    const urlNextDays = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;
    try {
        const days_response = await fetch(urlNextDays);
        const days_data = await days_response.json();

        if (days_data.error) {
            document.getElementById("Weather_of_nextDays").innerHTML = `<p>${days_data.error.message}</p>`;

        } else {
            let resultHtml = "";

            // Loop through forecast days
            days_data.forecast.forecastday.forEach(day => {
                resultHtml += `<br><br>
            <div class="forecast-day">
                <h4>${day.date}</h4>
                <img src="https:${day.day.condition.icon}" alt="Weather Icon">
                <p>Max: ${day.day.maxtemp_c}°C | Min: ${day.day.mintemp_c}°C</p>
                <p>${day.day.condition.text}</p>
            </div>
        `;
            });
            document.getElementById("Weather_of_nextDays").innerHTML = resultHtml;

        }
    } catch (error) {
        console.error("Error fetching weather data for next days");
    }
}
