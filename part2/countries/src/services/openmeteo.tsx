import { fetchWeatherApi } from "openmeteo";

const getWeatherData = async (lat: number, lng: number) => {
  const params = {
    latitude: lat,
    longitude: lng,
    current: [
      "temperature_2m",
      "is_day",
      "rain",
      "weather_code",
      "wind_speed_10m",
    ],
    wind_speed_unit: "ms",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  // https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.93&current=temperature_2m,is_day,rain,weather_code,wind_speed_10m&timezone=auto

  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const current = response.current()!;

  const current_units = {
    time: "iso8601",
    interval: "seconds",
    temperature_2m: "°C",
    is_day: "",
    rain: "mm",
    weather_code: "wmo code",
    wind_speed_10m: "m/s",
  };

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    latitude,
    longitude,
    timezone,
    timezoneAbbreviation,
    current_units,
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value().toFixed(1),
      isDay: current.variables(1)!.value(),
      rain: current.variables(2)!.value().toFixed(1),
      weatherCode: current.variables(3)!.value(),
      windSpeed10m: current.variables(4)!.value().toFixed(1),
    },
  };

  return weatherData;
};

export default { getWeatherData };
