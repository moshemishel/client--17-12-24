import ContactForm from './components/ContactForm';
import SuccessErrorDialog from './components/SuccessErrorDialog';
import submitUserDetails from "./submitUserDetails";
import { useState } from 'react';

interface RegisterDialog {
    onClose: () => void; 
  }

const registerDialog: React.FC<RegisterDialog> = ({onClose})=>{
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<{
        isSuccess: boolean;
        message: string;
      } | null>(null);

    function handleSubmissionResult(isSuccess: boolean , message: string){
        setSubmissionResult({isSuccess: isSuccess, message: message})
    }


   
    async function handleSubmitted(data: { name: string; phone: string }){
        const result = await submitUserDetails(data);
        console.log("handleSubmitted", result);
        handleSubmissionResult(result.isSuccess, result.message)
        setIsSubmitted(true);
    };

    return (
        <>
            {!isSubmitted ?
                <ContactForm 
                    onClose={onClose} 
                    onSubmit={handleSubmitted}/>
                :
                <SuccessErrorDialog 
                    onClose={onClose}
                    isSuccess={submissionResult?.isSuccess || false}
                    message={submissionResult?.message || ""}
                />
                }
        </>
        )
};

export default registerDialog;