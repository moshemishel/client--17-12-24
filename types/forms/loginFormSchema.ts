import { z } from 'zod';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

const emailSchema = z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }) 

const specialCharacters = "@$!%*?&#^()_-+={}[]|:;\"'<>,.?/\\~";
const escapedSpecialCharacters = specialCharacters.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

const passwordSchema = z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    // .max(20, { message: "Password must not exceed 20 characters" })
    // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    // .regex(/\d/, { message: "Password must contain at least one number" })
    // .regex(
    //   new RegExp(`[${escapedSpecialCharacters}]`),
    //   { message: `Password must contain at least one special character (${specialCharacters})` }
    // )
    
;
export const schema = z.object({
    email: emailSchema,
    password: passwordSchema
})


export type Schema = z.infer<typeof schema>;

export interface CommonFieldProps {
    register: UseFormRegister<Schema>;
    errors: FieldErrors<Schema>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement> , nextRef: React.RefObject<HTMLInputElement|HTMLButtonElement>) => void;
    nextRef: React.RefObject<HTMLInputElement| HTMLButtonElement>;
  }