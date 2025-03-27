import axios from 'axios';

import { Diary, DiaryFormValues } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  console.log('response.data:', response.data);
  return response.data;
};

const createNewDiary = async (object: DiaryFormValues) => {
  const response = await axios.post<Diary>(baseUrl, object);
  console.log('response.data:', response.data);
  return response.data;
};

export default { getAllDiaries, createNewDiary };
