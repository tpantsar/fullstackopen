import { Button, Container, Divider, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import DiaryList from './components/DiaryList';
import diaryService from './diaryService';
import { Diary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((data: Diary[]) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
            Flight Diary
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<DiaryList diaries={diaries} setDiaries={setDiaries} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
