import { forwardRef } from 'react';
import styles from '../login.module.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { CommonFieldProps as  EmailFieldProps } from '@/types/forms/loginFormSchema';

const Email = forwardRef<HTMLInputElement, EmailFieldProps>(({
  register, 
  errors, 
  handleKeyDown,
  nextRef, 
}, ref) => (
    <span>
      <TextField
        {...register("email")}
        inputRef={ref} 
        variant="outlined"
        name="email"
        label="Email"
        className={styles.textField}
        error={!!errors.email}  
        helperText={errors.email?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: "none" }}>
              <MailOutlineIcon /> 
            </InputAdornment>
          )
        }}  
      />
    </span>
 
));

export default Email;
