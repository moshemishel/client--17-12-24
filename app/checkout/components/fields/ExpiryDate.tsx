import { forwardRef } from 'react';
import { useState } from 'react';
import styles  from '../paymentForm.module.css';
import TextField  from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { SpecialFieldProps as ExpiryDateFieldProps } from '@/types/forms/payFormSchema';


  
  const ExpiryDateField = forwardRef<HTMLInputElement, ExpiryDateFieldProps>(({
    register, 
    errors, 
    handleKeyDown, 
    nextRef, 
    setError, 
    clearErrors, 
    setValue
  }, ref) => {
    
    const [date, setDate] = useState('');
  
    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { inputType, data: inputKey } = e.nativeEvent as InputEvent;
  
        let newDate = date;
        if (inputType.startsWith("deleteContent")) {
          newDate = date.length === 3 ? date.slice(0, -2) : date.slice(0, -1);
        } 
        else if (date.length === 5) {
          setError('expiryDate', { type: 'manual', message: 'Format MM/YY only' });
          setTimeout(() => clearErrors('expiryDate'), 2000);
        } 
        else if (/^[0-9]$/.test(inputKey || '')) {
          newDate = date.length === 1 ? date + inputKey + '/' : date + inputKey;
        } else {
          setError('expiryDate', { type: 'manual', message: 'Digits only' });
          setTimeout(() => clearErrors('expiryDate'), 2000);
        }
  
        setValue('expiryDate', newDate);
        setDate(newDate)
      }
    

    return (
      <TextField
        {...register('expiryDate')}
        inputRef={ref}
        variant="outlined"
        name="expiryDate"
        label="Expiry Date"
        className={styles.textField}
        placeholder="MM/YY"
        onChange={handleDateChange}
        value={date}
        error={!!errors.expiryDate}
        helperText={errors.expiryDate?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: "none" }}>
              <DateRangeIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  });
  
  export default ExpiryDateField;