import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { CommonFieldProps as  RoleFieldProps } from '@/types/forms/editUserDialog';

const RoleField = forwardRef<HTMLInputElement, RoleFieldProps>(({
  register, 
  errors, 
  handleKeyDown,
  nextRef, 
}, ref) => (
  
      <TextField
        {...register("name")}
        inputRef={ref} 
        variant="standard"
        name="role"
        label="Role"
        error={!!errors.role}  
        helperText={errors.role?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
          handleKeyDown(e , nextRef)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ pointerEvents: "none" }}>
              <ManageAccountsIcon /> 
            </InputAdornment>
          )
        }}  
      />
));

export default RoleField;