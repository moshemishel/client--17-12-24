'use client'; 
// להוסיף שדה לתשלומים
import { useSearchParams } from 'next/navigation';
import {useForm} from 'react-hook-form';
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import {Schema, schema} from '@/types/forms/payFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {SubmitControl} from '@/types/forms/payFormSchema';
import ExpiryDateField from './fields/ExpiryDate';
import NameField from './fields/Name';
import CardNumberField from './fields/CardNumber';
import SendButtonField from './fields/SendButton';
import CvvField from './fields/CVV';
import IdField from './fields/Id';
import styles from './paymentForm.module.css';




export default function paymentForm({submitControl}: SubmitControl) {
    
    const searchParams = useSearchParams();
 
    const { saleAmount, storeName, currency, token } = Object.fromEntries(searchParams);


    const {register, handleSubmit, setError, clearErrors, setValue, formState: {errors, isSubmitting}} = useForm<Schema>({
        mode: 'onChange',
        resolver: zodResolver(schema),
    });

    async function onSubmit(data: Schema) {
        console.log('Sending data...');
        await new Promise(resolve => setTimeout(resolve, 3000)); 
        console.log(data);
        submitControl({approvalNumber: 123456789})
    };
   
    
    const refs = {
        name:useRef<HTMLInputElement>(null),
        cardNumber:useRef<HTMLInputElement>(null),
        cvv:useRef<HTMLInputElement>(null),
        expiryDate:useRef<HTMLInputElement>(null),
        id:useRef<HTMLInputElement>(null),
        submit:useRef<HTMLButtonElement>(null),
    };
    
    useEffect(()=>{
        refs.name.current?.focus();
    },[])
    
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, nextRef:  React.RefObject<HTMLInputElement | HTMLButtonElement | HTMLSelectElement>
    ){
        if (e.key === 'Enter' && nextRef.current) {
            e.preventDefault();
            (nextRef.current as HTMLInputElement | HTMLButtonElement).focus();
         }
        }
    
   
    return (
    <Box
        component="form"
        className={styles.formContainer}
        sx={{display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'flex-start',
            width: { xs: '100%', sm: '80%', md: '60%' },
            '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
    >
        <div className={styles.amountContainer}>
            <span className={styles.amountLabel}>Amount to Pay: </span>
            <span className={styles.amountValue}>{`${currency} ${saleAmount}`}</span>
        </div>
        

        <NameField
            ref={refs.name}
            register={register}        
            errors={errors}            
            handleKeyDown={handleKeyDown}
            nextRef={refs.cardNumber}
        />

        <CardNumberField
            ref={refs.cardNumber}
            register={register}        
            errors={errors}            
            handleKeyDown={handleKeyDown}  
            nextRef={refs.cvv}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
        />

        <CvvField
            ref={refs.cvv}
            register={register}        
            errors={errors}            
            handleKeyDown={handleKeyDown}  
            nextRef={refs.expiryDate}
        />

        <ExpiryDateField 
            ref={refs.expiryDate}
            register={register} 
            errors={errors}
            handleKeyDown={handleKeyDown}
            nextRef={refs.id}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
        />

        <IdField 
            ref={refs.id}
            register={register} 
            errors={errors}
            handleKeyDown={handleKeyDown}
            nextRef={refs.submit}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue} 
        />

        <SendButtonField ref={refs.submit} isSubmitting={isSubmitting} innerText={"Pay"} />
    </Box>
        
    )
};
