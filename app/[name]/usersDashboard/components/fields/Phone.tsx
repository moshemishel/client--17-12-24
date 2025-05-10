import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { CommonFieldProps as  PhoneFieldProps } from '@/types/forms/editUserDialog';

const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(({
  register, 
  errors, 
  handleKeyDown,
  nextRef, 
}, ref) => (
  
      <TextField
        {...register("name")}
        inputRef={ref} 
        variant="standard"
        name="phone"
        label="Phone"
        error={!!errors.phone}  
        helperText={errors.phone?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: "none" }}>
              <ContactPhoneIcon /> 
            </InputAdornment>
          )
        }}  
      />
));

export default PhoneField;