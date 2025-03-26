## [Part9 - TypeScript](https://fullstackopen.com/en/part9/)

## BMI Calculator

```sh
npm run calculateBmi 180 74
```

Where the first argument is the height in cm, and second argument is the weight in kg.

### [WebBMI](./requests/bmi.rest)

```sh
npm run start
http://localhost:3003/bmi?height=180&weight=74
```

## Exercise Calculator

Calculates the average time of daily exercise hours and compares it to the target amount of daily hours.

```sh
npm run calculateExercises 2 3 0 2 4.5 0 3 1
```

Where the first argument is the target value (2), and the following numbers represent the exercise hours.

### [WebExercises](./requests/exercises.rest)

```sh
npm run start
POST http://localhost:3003/exercises
```

Request body:

```json
{
  "daily_exercises": [3, 0, 2, 4.5, 0, 3, 1],
  "target": 2
}
```
