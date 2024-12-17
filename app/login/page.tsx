"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReasonMessage from "./components/reasonMassage";
import Email from "./components/email";
import Password from "./components/password";
import styles from "./login.module.css";
import { Schema, schema } from "@/types/forms/loginFormSchema";
import SendButtonField from "../checkout/components/fields/SendButton";
import {useAuth} from '@/context/AuthContext';
import {User} from '@/types/context/AuthContext'


export default function Login() {
    const {user , login} = useAuth();

    const searchParams = useSearchParams();
    const reason = searchParams.get('reason') || null;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Schema>({
        mode: "onSubmit",
        resolver: zodResolver(schema),
    });

    const refs = {
        email: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
        submit: useRef<HTMLButtonElement>(null),
    };

    useEffect(() => {
        refs.email.current?.focus();
    }, []);

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>,
        nextRef: React.RefObject<HTMLInputElement | HTMLButtonElement>
    ) {
        if (e.key === "Enter" && nextRef.current) {
            e.preventDefault();
            nextRef.current.focus();
        }
    };


    async function onSubmit(data: Schema) {
        // // שיפור נדרש להוסיף טריי - נסיון
        // // שיפור נדרש להוסיף טיפול במצב שגיאה
        console.log('login data', data);
        
        // const response = await fetch('https://d556-2a06-c701-7450-f000-65bd-dda6-82b5-4dfd.ngrok-free.app/auth/login', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: { 'Content-Type': 'application/json' },
        // });
    
        // if (response.ok) {
        //     const userData = await response.json();
        //     console.log("login - userData", userData);
            
        //     login(userData);
        // } else {
        //     alert('שם משתמש או סיסמה שגויים');
        // }
        const user1: User = {
            userName: 'moshemishel',
            userId: "ggg",
            login: true,
            role: 50,
            msg: "hghgh"
        }
        login(user1)
    };

    return (
        <>
        {!!reason && <ReasonMessage reason={reason}/>}
        <Box
            component="form"
            className={styles.formContainer}
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "flex-start",
                width: { xs: "100%", sm: "80%", md: "60%" },
                "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Email
                ref={refs.email}
                register={register}
                errors={errors}
                handleKeyDown={handleKeyDown}
                nextRef={refs.password}
            />

            <Password
                ref={refs.password}
                register={register}
                errors={errors}
                handleKeyDown={handleKeyDown}
                nextRef={refs.submit}
            />

            <SendButtonField
                ref={refs.submit}
                isSubmitting={isSubmitting}
                innerText={"Send"}
            />
        </Box>
        </>
    );
}
