"use client";
import { useForm } from "react-hook-form";
import { useEffect, useRef} from "react";
import { Schema, schema } from "@/types/forms/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import NameField from "./fields/Name";
import PhoneField from "./fields/Phone";
import SendButton from "./fields/SendButton";



interface ContactForm {
  onClose: () => void; 
  onSubmit: (data: { name: string; phone: string }) => Promise<void>;
}


const ContactForm: React.FC<ContactForm> = ({onClose, onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const refs = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    submit: useRef<HTMLButtonElement>(null),
  };

  useEffect(() => {
    refs.name.current?.focus();
  }, [open]);

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement | HTMLButtonElement>
  ) {
    if (e.key === "Enter" && nextRef.current) {
      e.preventDefault();
      (nextRef.current as HTMLInputElement | HTMLButtonElement).focus();
    }
  }

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Contact Details</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <NameField
            ref={refs.name}
            register={register}
            errors={errors}
            handleKeyDown={handleKeyDown}
            nextRef={refs.phone}
          />

          <PhoneField
            ref={refs.phone}
            register={register}
            errors={errors}
            handleKeyDown={handleKeyDown}
            nextRef={refs.submit}
          />

          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
            
            <SendButton
              ref={refs.submit}
              isSubmitting={isSubmitting}
              innerText={"Save"}
            />
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
