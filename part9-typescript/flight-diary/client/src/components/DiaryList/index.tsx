import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';

import { useState } from 'react';

import diaryService from '../../diaryService';
import { Diary, DiaryFormValues } from '../../types';
import AddDiaryModal from '../AddDiaryModal';

interface Props {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryList = ({ diaries, setDiaries }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Previous flights: {diaries.length}
        </Typography>
      </Box>
      <Button variant="contained" onClick={() => openModal()}>
        New Flight
      </Button>
      <Table style={{ marginBottom: '1em' }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Weather</TableCell>
            <TableCell>Visibility</TableCell>
            <TableCell>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(diaries).map((diary: Diary) => (
            <TableRow key={diary.id}>
              <TableCell>{diary.date}</TableCell>
              <TableCell>{diary.weather}</TableCell>
              <TableCell>{diary.visibility}</TableCell>
              <TableCell>{diary.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddDiaryModal
        modalOpen={modalOpen}
        onSubmit={submitNewDiary}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default DiaryList;
