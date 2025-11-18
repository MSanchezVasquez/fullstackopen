import axios from "axios";

const getWeatherByCountry = (lat, lon, apiKey) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  );
  return request.then((response) => response.data);
};

export default { getWeatherByCountry };
