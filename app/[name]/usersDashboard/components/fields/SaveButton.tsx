import { forwardRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import {SendButtonFieldProps} from '@/types/forms/payFormSchema'

const SaveButtonField = forwardRef<HTMLButtonElement, SendButtonFieldProps>(({ isSubmitting, innerText}, ref) => {
  return (
    <LoadingButton
      ref={ref}
      size="small"
      type="submit"
      endIcon={<SendIcon />}
      loading={isSubmitting}  
      loadingPosition="end"
      variant="contained"
    >
      {innerText}
    </LoadingButton>
  );
});

export default SaveButtonField;