import { forwardRef } from 'react';
import styles from '../paymentForm.module.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CommonFieldProps as  NameFieldProps } from '@/types/forms/payFormSchema';

const NameField = forwardRef<HTMLInputElement, NameFieldProps>(({
  register, 
  errors, 
  handleKeyDown,
  nextRef, 
}, ref) => (
  <Tooltip title="Name as it appears on the CreditCard" placement="bottom-start" arrow enterDelay={500}>
    <span>
      <TextField
        {...register("name")}
        inputRef={ref} 
        variant="outlined"
        name="name"
        label="Name"
        className={styles.textField}
        error={!!errors.name}  
        helperText={errors.name?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: "none" }}>
              <AccountCircleIcon /> 
            </InputAdornment>
          )
        }}  
      />
    </span>
  </Tooltip>
));

export default NameField;
