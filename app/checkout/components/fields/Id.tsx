import { forwardRef } from 'react';
import { useState } from 'react';
import styles  from '../paymentForm.module.css';
import TextField  from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { SpecialFieldProps as IdFieldProps } from '@/types/forms/payFormSchema';
  
  const IdField = forwardRef<HTMLInputElement, IdFieldProps>(({
    register, 
    errors, 
    handleKeyDown, 
    nextRef, 
    setError, 
    clearErrors, 
    setValue
  }, ref) => {
    
    const [id, setId] = useState('');
  
    function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { inputType, data: inputKey } = e.nativeEvent as InputEvent;
         
        let newId = id;
        if (inputType.startsWith("deleteContent")) {
          newId = newId.slice(0, -1);
        } 
        else if (newId.length === 9) {
          setError('id', { type: 'manual', message: 'ID number must be 9 digits only' });
          setTimeout(() => clearErrors('id'), 2000);
        } 
        else if (/^[0-9]$/.test(inputKey || '')) {
          newId += inputKey ;
        } else {
          setError('id', { type: 'manual', message: 'Digits only' });
          setTimeout(() => clearErrors('id'), 2000);
        }

        // setValue('id', newId);
        setId(newId);
      }
  
  
    return (
      <TextField
        {...register('id')}
        inputRef={ref}
        variant="outlined"
        name="id"
        label="id"
        className={styles.textField}
        onChange={handleIdChange}
        value={id}
        error={!!errors.id}
        helperText={errors.id?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: "none" }}>
              <PermIdentityIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  });
  
  export default IdField;