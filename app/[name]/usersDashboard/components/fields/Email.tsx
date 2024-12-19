import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import { CommonFieldProps as  EmailFieldProps } from '@/types/forms/editUserDialog';

const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(({
  register, 
  errors, 
  handleKeyDown,
  nextRef, 
}, ref) => (
  
      <TextField
        {...register("name")}
        inputRef={ref} 
        variant="standard"
        name="email"
        label="Email"
        error={!!errors.email}  
        helperText={errors.email?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: "none" }}>
              <EmailIcon /> 
            </InputAdornment>
          )
        }}  
      />
));

export default EmailField;