import { Button } from '@mui/material';
import axios from 'axios';

import { useEffect, useState } from 'react';

import AddDiaryModal from './components/AddDiaryModal';
import diaryService from './diaryService';
import { Diary, DiaryFormValues, Visibility, Weather } from './types';

const DiaryItem = ({ diary }: { diary: Diary }) => (
  <div className="diary-item">
    <p>Date: {diary.date}</p>
    <p>weather: {diary.weather}</p>
    <p>visibility: {diary.visibility}</p>
    {diary.comment && <p>Comment: {diary.comment}</p>}
  </div>
);

const App = () => {
  const initialDiaries: Diary[] = [
    {
      id: 1,
      date: '2025-03-27',
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: 'Nice flight!',
    },
  ];

  const [diaries, setDiaries] = useState<Diary[]>(initialDiaries);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    diaryService.getAllDiaries().then((data: Diary[]) => {
      setDiaries(data);
    });
  }, []);

  const submitNewDiary = async (values: DiaryFormValues) => {
    try {
      const diary = await diaryService.createNewDiary(values);
      setDiaries(diaries.concat(diary));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <AddDiaryModal
        modalOpen={modalOpen}
        onSubmit={submitNewDiary}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        New Flight
      </Button>
      <h2>Previous flights</h2>
      {diaries.map((diary) => (
        <DiaryItem key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default App;
