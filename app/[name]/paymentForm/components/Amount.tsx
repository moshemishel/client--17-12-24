import { forwardRef } from 'react';
import styles from '@/app/checkout/components/paymentForm.module.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PaymentsIcon from '@mui/icons-material/Payments';
import { CommonFieldProps as  AmountFieldProps } from '@/types/forms/payFormSchema';


const AmountField = forwardRef<HTMLInputElement, AmountFieldProps>(
  ({ register, errors, handleKeyDown, nextRef }, ref) => {
    return (
      <TextField
        {...register('amount')}
        inputRef={ref} 
        variant="outlined"
        name="amount"
        label="Amount"
        className={styles.textField}
        error={!!errors.amount}
        helperText={errors.amount?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: 'none' }}>
              <PaymentsIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default AmountField;