import { fetchWeatherApi } from "openmeteo";

const getWeatherData = async (latitude: number, longitude: number) => {
  const params = {
    latitude: latitude, // 60.17 is Helsinki, Finland
    longitude: longitude, // 24.93 is Helsinki, Finland
    current: ["temperature_2m", "rain", "weather_code", "wind_speed_10m"],
    timezone: "auto",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  // https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.93&current=temperature_2m&timezone=auto

  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  console.debug("response:", response);

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      rain: current.variables(1)!.value(),
      weatherCode: current.variables(2)!.value(),
      windSpeed10m: current.variables(3)!.value(),
    },
  };

  console.debug("weatherData:", weatherData);
  return weatherData;
};

export default { getWeatherData };
