import { forwardRef } from 'react';
import styles from '../paymentForm.module.css';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import {SendButtonFieldProps} from '@/types/forms/payFormSchema'

const SendButtonField = forwardRef<HTMLButtonElement, SendButtonFieldProps>(({ isSubmitting, innerText}, ref) => {
  return (
    <LoadingButton
      ref={ref}
      size="small"
      type="submit"
      endIcon={<SendIcon />}
      loading={isSubmitting}  
      loadingPosition="end"
      variant="contained"
      className={styles.submitButton}
    >
      {innerText}
    </LoadingButton>
  );
});

export default SendButtonField;