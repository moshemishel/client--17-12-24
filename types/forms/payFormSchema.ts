import { z } from 'zod';
import { UseFormRegister, FieldErrors, UseFormSetError, UseFormClearErrors, UseFormSetValue} from 'react-hook-form';


const isValidCreditCardNumber = (number: string) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = Number(number[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

function isValidID(id: string) {
    let sum = 0;  
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(id[i], 10);
      
      if (i % 2 === 0) {
        sum += digit;
      } else {
        let doubled = digit * 2;
        if (doubled > 9) {
          sum += (doubled - 9); 
        } else {
          sum += doubled;
        }
      }
    }
      return sum % 10 === 0;
  }

export const nameSchema = z.string().min(1, "This field is required");

export const cardNumberSchema = z.string()
    .min(1, "This field is required")
    .regex(/^\d+$/, "The card number should contain only numbers")
    .min(8, "Number is too short")
    .max(16, "Number is too long")
    .refine((val) => isValidCreditCardNumber(val), {
        message: "Invalid credit card number",
    })
    

export const cvvSchema = z.string()
    .min(1, "This field is required")
    .regex(/^\d+$/, "CVV should contain only digits")
    .regex(/^\d{3,4}$/, "CVV should be 3 or 4 digits long")
   

const expirationDateSchema = z.string()
    .min(1, "This field is required")
    .regex(/^\d{2}\/\d{2}$/, "Expiration date must be in the format MM/YY")
    .refine((val) => {
        
    const [month, year] = val.split("/").map(Number);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;     

    if (month < 1 || month > 12) return false;

    if (year < currentYear) return false;

    if (year === currentYear && month < currentMonth) return false;

    return true;
}, {
    message: "Invalid expiration date",
});

const idSchema = z.string()
    .min(1, "This field is required")
    .regex(/^\d+$/, "ID should contain only digits")
    .min(9, 'ID number must be 9 digits long. *Leading zeros are allowed')
    .max(9, 'ID number must be 9 digits long')
    .refine((val)=> isValidID(val), {
        message :"Invalid ID",
    });

const amountSchema = z.string()
  .min(1, "This field is required")
  .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
  

const currencySchema = z.string({
    required_error: "This field is required",
  })
    .refine((val) => ["ILS", "USD", "EUR"].includes(val), {
      message: "Invalid currency",
    });


const installmentsSchema =z.preprocess(
  (val) => (val === "" ? undefined : !isNaN(Number(val)) ? Number(val): val), 
  z.number({required_error: "This field is required",})
  .int("Number of installments must be an integer")
  .positive("Number of installments must be positive")
  .min(1, "Number of installments must be at least 1")  
  .max(36, "Number of installments can be at most 36")
);


export const schema = z.object({
    amount: amountSchema.optional(),
    currency: currencySchema.optional(),
    name: nameSchema,
    cardNumber: cardNumberSchema,
    cvv: cvvSchema,
    expiryDate: expirationDateSchema,
    id: idSchema,
    installments: installmentsSchema.optional()
});

export type Schema = z.infer<typeof schema>;

// export const defaultValues: Schema = {
//     name: "",
//     cardNumber: "",
//     cvv: "",
//     expiryDate: "",
//     id: "000000000",
// };

export interface CommonFieldProps {
    register: UseFormRegister<Schema>;
    errors: FieldErrors<Schema>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement> , nextRef: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>) => void;
    nextRef: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>;
  }

export interface SpecialFieldProps  extends CommonFieldProps{
    setError: UseFormSetError<Schema>; 
    clearErrors: UseFormClearErrors<Schema>; 
    setValue: UseFormSetValue<Schema>; 
  }

export interface SendButtonFieldProps {
    isSubmitting: boolean,
    innerText: string; 
} 

export type ServerData = {
    approvalNumber: string;
};
export interface SubmitControl {
    submitControl: (data: Schema) => void;
};