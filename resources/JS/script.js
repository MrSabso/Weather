const citySelect = document.getElementById("city");
const timeSelect = document.getElementById("choose-time");

citySelect.addEventListener("change", async (e) => {
    const city = e.target.value;
    const time = timeSelect.value;
    fetchWeather(city, time);

});

timeSelect.addEventListener("change", async (e) => {
    const time = e.target.value;
    const city = citySelect.value;
    fetchWeather(city, time);
});

const renderUI = (data) => {
    const cityBoxes = document.querySelectorAll(".cityBox");
    const h2Teg = document.querySelector(".h2teg")

    cityBoxes.forEach((cityBox, index) => {
        const cityData = data[index];
        
        const tempElement = cityBox.querySelector(".temperature");
        const humidity = cityBox.querySelector(".humidity");
        const weather = cityBox.querySelector(".weather");
        const windSpeed = cityBox.querySelector(".wind-speed");
        const imageContainer = cityBox.querySelector(".image");
        const cityNameElement = h2Teg.querySelector(".city-name");

        if (cityData) {
            tempElement.innerHTML = `Temp: ${cityData.temp}°C`;
            humidity.innerHTML = `Humidity: ${cityData.humidity}%`;
            weather.innerHTML = `Weather: ${cityData.weather}`;
            windSpeed.innerHTML = `Wind speed: ${cityData.wind_speed} km/h`;

            const img = document.createElement("img");
            img.src = `https://openweathermap.org/img/wn/${cityData.icon}@2x.png`;
            img.alt = `${cityData.weather} icon`;

            imageContainer.innerHTML = "";
            imageContainer.appendChild(img);

            cityNameElement.innerHTML = `City: ${cityData.city}`;
            cityBox.querySelector(".Capital-city").innerText = `Time: ${cityData.time}`;
        }
    });
};

const fetchWeather = async (city, timeSelectt) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=669183339e0aadfba7c3db965e02158b&units=metric`);
    const data = await response.json();

    const filteredData = data.list.filter(el => el.dt_txt.includes(`${timeSelectt}`)).slice(0, 5);

    const mydata = filteredData.map((el, index) => ({
        day: `Day ${index + 1}`,
        city: data.city.name,
        temp: el.main.temp,
        weather: el.weather[0].main,
        icon: el.weather[0].icon,
        time: el.dt_txt,
        wind_speed: el.wind.speed,
        humidity: el.main.humidity
    }));
    console.log(mydata)
    renderUI(mydata);
};

fetchWeather();

