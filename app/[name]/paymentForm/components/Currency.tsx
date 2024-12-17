import { forwardRef } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

import { CommonFieldProps as  AmountFieldProps } from '@/types/forms/payFormSchema';


const CurrencyField = forwardRef<HTMLSelectElement, AmountFieldProps>(
  ({ register, errors, handleKeyDown, nextRef }, ref) => {
    return (

        <FormControl variant='outlined' error={!!errors.currency} >
            <InputLabel>Currency</InputLabel>
                <Select
                    {...register('currency')}
                    inputRef={ref}
                    label="Currency"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, nextRef)}
                >
                    <MenuItem value="ILS">₪</MenuItem> 
                    <MenuItem value="USD">$</MenuItem> 
                    <MenuItem value="EUR">€</MenuItem> 
                </Select>
                {errors.currency && <FormHelperText>{errors.currency.message}</FormHelperText>}
     

        </FormControl>

    
    //   <TextField
    //     {...register('currency')}
    //     inputRef={ref} 
    //     variant="outlined"
    //     name="currency"
    //     label="Currency"
    //     className={styles.textField}
    //     error={!!errors.currency}
    //     helperText={errors.currency?.message}
    //     onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>)=> {
    //       handleKeyDown(e , nextRef)}}
    //     InputProps={{
    //       startAdornment: (
    //         <InputAdornment position="start" style={{ pointerEvents: 'none' }}>
    //           <EuroIcon />
    //         </InputAdornment>
    //       ),
    //     }}
    //   />
    );
  }
);

export default CurrencyField;