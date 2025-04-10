import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

import { SyntheticEvent, useState } from 'react';

import { DiaryFormValues, Visibility, Weather } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: DiaryFormValues) => void;
}

interface WeatherOption {
  value: Weather;
  label: string;
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));

interface VisibilityOption {
  value: Visibility;
  label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddDiaryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs().startOf('day'));
  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [comment, setComment] = useState('');

  const onWeatherChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const weather = Object.values(Weather).find((w) => w.toString() === value);
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const onVisibilityChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find((v) => v.toString() === value);
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const addFlight = (event: SyntheticEvent) => {
    event.preventDefault();

    const dateAsString = date?.format('YYYY-MM-DD');
    console.log('dateAsString:', dateAsString);

    onSubmit({
      date: dateAsString,
      weather,
      visibility,
      comment,
    });
  };

  return (
    <div>
      <form onSubmit={addFlight}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date" value={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider>

        <InputLabel style={{ marginTop: 20 }}>Weather</InputLabel>
        <Select label="Weather" fullWidth value={weather} onChange={onWeatherChange}>
          {weatherOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <InputLabel style={{ marginTop: 20 }}>Visibility</InputLabel>
        <Select label="Visibility" fullWidth value={visibility} onChange={onVisibilityChange}>
          {visibilityOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          style={{ marginTop: 20, marginBottom: 20 }}
          label="Comment"
          fullWidth
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />

        <Grid>
          <Grid component={Grid}>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid component={Grid}>
            <Button
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddDiaryForm;
