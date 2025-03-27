import { useEffect, useState } from 'react';

import { getAllDiaries } from './diaryService';
import { DiaryEntry, Visibility, Weather } from './types';

const DiaryItem = ({ diary }: { diary: DiaryEntry }) => (
  <div className="diary-item">
    <p>Date: {diary.date}</p>
    <p>weather: {diary.weather}</p>
    <p>visibility: {diary.visibility}</p>
  </div>
);

const App = () => {
  const initialDiaries: DiaryEntry[] = [
    {
      id: 1,
      date: '2025-03-27',
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: 'Nice flight!',
    },
  ];
  const [diaries, setDiaries] = useState<DiaryEntry[]>(initialDiaries);

  useEffect(() => {
    getAllDiaries().then((data: DiaryEntry[]) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h2>Previous flights</h2>
      {diaries.map((diary) => (
        <DiaryItem key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default App;
