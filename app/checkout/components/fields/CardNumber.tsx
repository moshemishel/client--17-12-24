import { forwardRef, useState } from 'react';
import styles from '../paymentForm.module.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { SpecialFieldProps as  CardNumberFieldProps } from '@/types/forms/payFormSchema';



const CardNumberField = forwardRef<HTMLInputElement, CardNumberFieldProps>(
  ({
    register, 
    errors, 
    handleKeyDown, 
    nextRef, 
    setError, 
    clearErrors, 
    setValue
  }, ref) => {

    const [cardNumber, setCardNumber] = useState('');

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
      const { inputType, data: inputKey } = e.nativeEvent as InputEvent;
      
      let newCarsNumber = cardNumber.replace(/\s+/g, '');
        if (inputType.startsWith("deleteContent")) {
          newCarsNumber = newCarsNumber.slice(0, -1);
        } 
        else if (newCarsNumber.length === 16) {
          setError('cardNumber', { type: 'manual', message: 'The card number cannot exceed 16 digits' });
          setTimeout(() => clearErrors('cardNumber'), 2000);
        } 
        else if (/^[0-9]$/.test(inputKey || '')) {
          newCarsNumber += inputKey;
        } else {
          setError('cardNumber', { type: 'manual', message: 'Digits only' });
          setTimeout(() => clearErrors('cardNumber'), 2000);
        }
        
        newCarsNumber = newCarsNumber.replace(/(.{4})/g, '$1 ').trim();
        setValue('cardNumber', newCarsNumber);
        setCardNumber(newCarsNumber);
      }

    return (
      <TextField
        {...register('cardNumber')}
        inputRef={ref} 
        variant="outlined"
        name="cardNumber"
        label="Card Number"
        value={cardNumber}
        className={styles.textField}
        error={!!errors.cardNumber}
        helperText={errors.cardNumber?.message}
        onChange={handleCardNumberChange}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: 'none' }}>
              <CreditCardIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default CardNumberField;