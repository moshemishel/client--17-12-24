'use client';
import { useState, forwardRef } from "react";
import styles from "../login.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CommonFieldProps as PasswordFieldProps } from "@/types/forms/loginFormSchema";

const Password = forwardRef<HTMLInputElement, PasswordFieldProps>(({
  register,
  errors,
  handleKeyDown,
  nextRef,
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <span>
      <TextField
        {...register("password")}
        inputRef={ref}
        variant="outlined"
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        className={styles.textField}
        error={!!errors.password}
        helperText={errors.password?.message}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e, nextRef)
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </span>
  );
});

export default Password;