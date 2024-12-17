'use client';
import PaymentForm from './components/paymentForm';
import PaymentConfirm from './components/paymentConfirmation';
import { ServerData } from '@/types/forms/payFormSchema';
import { useState } from 'react';

// #url
export default function checkoutPage() {
    const [submit, setSubmit] = useState<ServerData | boolean>(false);

    function updateSubmit(data: ServerData){
        setSubmit(data);
        
    }

    return (
        <div>
        {submit == false ? (<PaymentForm submitControl={updateSubmit}/>) : (submit && <PaymentConfirm data={submit}/>) }
        </div>
    );
}