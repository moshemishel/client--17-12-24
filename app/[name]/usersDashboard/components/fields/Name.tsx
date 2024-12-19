import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CommonFieldProps as  NameFieldProps } from '@/types/forms/editUserDialog';
import { error } from 'console';

const NameField = forwardRef<HTMLInputElement, NameFieldProps>(({
  register, 
  errors, 
  handleKeyDown,
  nextRef, 
}, ref) => (
  
      <TextField
        {...register("name")}
        inputRef={ref} 
        variant="standard"
        name="name"
        label="Name"
        onChange={(e)=> console.log('val', e.target.value, 'error', errors)
        }
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
));

export default NameField;