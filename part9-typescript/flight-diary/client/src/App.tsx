import { useEffect, useState } from 'react';

import { getAllDiaries } from './diaryService';
import { DiaryEntry, Visibility, Weather } from './types';

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
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>{diary.date}</li>
        ))}
      </ul>
    </div>
  );
};
export default App;
