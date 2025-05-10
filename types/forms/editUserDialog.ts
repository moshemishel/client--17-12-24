import { z } from 'zod';
import validator from 'validator';
import { UseFormRegister, FieldErrors, UseFormSetError, UseFormClearErrors, UseFormSetValue} from 'react-hook-form';

export const nameSchema = z.string().min(1, "This field is required");

export const emailSchema = z.string()
    .min(1, "This field is required")  
    .refine((email) => validator.isEmail(email), {
    message: "Invalid email address", 
  });


export const phoneNumberSchema = z.string()
  .min(1, "This field is required") 
  .regex(/^05\d{8}$/, "Invalid Israeli phone number") 
  .refine((val) => val.length === 10, {
    message: "Phone number must be 10 digits long", 
  })
  .refine((val) => validator.isMobilePhone(val, 'he-IL', { strictMode: true }), {
    message: "Invalid Israeli mobile phone number", 
  });

export const roleSchema = z.string().min(1, "This field is required")

export const schema = z.object({
    name: nameSchema,
    phone: phoneNumberSchema,
    email: emailSchema,
    role: roleSchema,
});

export type Schema = z.infer<typeof schema>;

export interface CommonFieldProps {
    register: UseFormRegister<Schema>;
    errors: FieldErrors<Schema>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement> , nextRef: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>) => void;
    nextRef: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>;
  }

// export interface SpecialFieldProps  extends CommonFieldProps{
//     setError: UseFormSetError<Schema>; 
//     clearErrors: UseFormClearErrors<Schema>; 
//     setValue: UseFormSetValue<Schema>; 
//   }

// export interface SubmitControl {
//     submitControl: (data: Schema) =>  Promise<boolean>;
// };

export interface SendButtonFieldProps {
  isSubmitting: boolean,
  innerText: string; 
} 