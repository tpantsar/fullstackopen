## Generating API Key for weather forecast

https://openweathermap.org/

https://openweathermap.org/weather-conditions#Icon-list

## Define API key as an environment variable:

```
export VITE_SOME_KEY=54l41n3n4v41m34rv0 && npm run dev // Linux/macOS Bash
($env:VITE_SOME_KEY="54l41n3n4v41m34rv0") -and (npm run dev) // Windows PowerShell
set "VITE_SOME_KEY=54l41n3n4v41m34rv0" && npm run dev // Windows cmd.exe
```

## Access API key through import.meta.env:

```
const api_key = import.meta.env.VITE_SOME_KEY
```
