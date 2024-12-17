import { forwardRef } from 'react';
import styles from '@/app/checkout/components/paymentForm.module.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';import { CommonFieldProps as  AmountFieldProps } from '@/types/forms/payFormSchema';


const InstallmentsField = forwardRef<HTMLInputElement, AmountFieldProps>(
  ({ register, errors, handleKeyDown, nextRef }, ref) => {
    return (
      <TextField
        {...register('installments')}
        inputRef={ref} 
        variant="outlined"
        name="installments"
        label="Installments"
        // className={styles.textField}
        error={!!errors.installments}
        helperText={errors.installments?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: 'none' }}>
              <AddToQueueIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default InstallmentsField;