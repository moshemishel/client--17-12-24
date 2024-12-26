import { z } from 'zod';
import validator from 'validator';
import { UseFormRegister, FieldErrors} from 'react-hook-form';


export const nameSchema = z.string().min(1, "This field is required");

export const phoneNumberSchema = z.string()
  .min(1, "This field is required") 
  .regex(/^05\d{8}$/, "Invalid Israeli phone number") 
  .refine((val) => val.length === 10, {
    message: "Phone number must be 10 digits long", 
  })
  .refine((val) => validator.isMobilePhone(val, 'he-IL', { strictMode: true }), {
    message: "Invalid Israeli mobile phone number", 
  });


export const schema = z.object({
    name: nameSchema,
    phone: phoneNumberSchema
  });

export type Schema = z.infer<typeof schema>;

export interface CommonFieldProps {
    register: UseFormRegister<Schema>;
    errors: FieldErrors<Schema>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement> , nextRef: React.RefObject<HTMLInputElement  | HTMLButtonElement>) => void;
    nextRef: React.RefObject<HTMLInputElement | HTMLButtonElement>;
  }

  export interface SendButtonFieldProps {
    isSubmitting: boolean,
    innerText: string; 
} 