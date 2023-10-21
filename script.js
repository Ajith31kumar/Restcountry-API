const openWeatherApiKey = '19d72086cf96a9b990ac4b096d5599ea'; 

const loadCountriesAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            displayCountries(data);
        });
}

const displayCountries = countries => {
    const container = document.getElementById('countries');
    container.innerHTML = '';

    countries.forEach(country => {
        const card = createCountryCard(country);
        container.appendChild(card);
    });
}

const createCountryCard = country => {
    const card = document.createElement('div');
    card.className = "col-md-4 mb-4";

    const cardHTML = `
        <div class="card">
            <h5 class="card-title">${country.name.common}</h5>
            <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} Flag">
            <div class="card-body">
                <p class="card-text">Capital: ${country.capital}</p>
                <p class="card-text">Region: ${country.region}</p>
                <p class="card-text">Latitude/Longitude: ${country.latlng.join(', ')}</p>
                <button onclick="fetchWeatherData(${country.latlng[0]},${country.latlng[1]})" class="btn btn-primary" data-toggle="modal" data-target="#weatherModal" data-country="${country.name.common}">Click for Weather</button>
                
            </div>
        </div>
    `;

    card.innerHTML = cardHTML;



    return card;
}

const fetchWeatherData = (lat,lng) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=19d72086cf96a9b990ac4b096d5599ea`

    fetch(apiUrl)
        .then(response => response.json())
        .then(weatherData => {
            const temperature = (weatherData.main.temp - 273.15).toFixed(2); // Convert temperature to Celsius
            const description = weatherData.weather[0].description;
            const modalContent = `Temperature : ${temperature}°C<br>Weather: ${description}`;
            alert(modalContent)
            displayModalContent(modalContent);
        })
        .catch(error => {
            console.error('Error fetching weather data', error);
        });
}

const displayModalContent = (content) => {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = content;
}

loadCountriesAPI();