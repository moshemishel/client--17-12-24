'use client';
import {useForm} from 'react-hook-form';
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import {Schema, schema} from '@/types/forms/payFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {SubmitControl} from '@/types/forms/payFormSchema';

import AmountField from './components/Amount';
import CurrencyField from './components/Currency';
import InstallmentsField from './components/Installments';

import ExpiryDateField from '@/app/checkout/components/fields/ExpiryDate';
import NameField from '@/app/checkout/components/fields/Name';
import CardNumberField from '@/app/checkout/components/fields/CardNumber';
import SendButtonField from '@/app/checkout/components/fields/SendButton';
import CvvField from '@/app/checkout/components/fields/CVV';
import IdField from '@/app/checkout/components/fields/Id';
import styles from '@/app/checkout/components/paymentForm.module.css';




export default function paymentForm({submitControl}: SubmitControl) {
    
    


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
        amount:useRef<HTMLInputElement>(null),
        currency:useRef<HTMLSelectElement>(null),
        name:useRef<HTMLInputElement>(null),
        cardNumber:useRef<HTMLInputElement>(null),
        cvv:useRef<HTMLInputElement>(null),
        expiryDate:useRef<HTMLInputElement>(null),
        id:useRef<HTMLInputElement>(null),
        installments:useRef<HTMLInputElement>(null),
        submit:useRef<HTMLButtonElement>(null),
    };
    
    useEffect(()=>{
        refs.name.current?.focus();
    },[])
    
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>, nextRef:  React.RefObject<HTMLInputElement | HTMLSelectElement| HTMLButtonElement>
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
        
        <AmountField
          ref={refs.amount}
          register={register}        
          errors={errors}            
          handleKeyDown={handleKeyDown}
          nextRef={refs.currency}
        />

        <CurrencyField 
          ref={refs.currency}
          register={register}        
          errors={errors}            
          handleKeyDown={handleKeyDown}
          nextRef={refs.name}
        />
      
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
            nextRef={refs.installments}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue} 
        />

        <InstallmentsField 
          ref={refs.installments}
          register={register}        
          errors={errors}            
          handleKeyDown={handleKeyDown}
          nextRef={refs.submit}
        />

        <SendButtonField ref={refs.submit} isSubmitting={isSubmitting} innerText={"Pay"} />
    </Box>
        
    )
};
