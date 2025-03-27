import { Alert, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';

import { DiaryFormValues } from '../../types';
import AddDiaryForm from './AddDiaryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: DiaryFormValues) => void;
  error?: string;
}

const AddDiaryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>New flight</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddDiaryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddDiaryModal;
