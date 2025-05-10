"use client";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { Schema, schema } from "@/types/forms/editUserDialog";
import { zodResolver } from "@hookform/resolvers/zod";
// import createUser from './createUser';
import NameField from "./fields/Name";
import EmailField from "./fields/Email";
import PhoneField from "./fields/Phone";
import RoleField from "./fields/Role";
import SaveButton from "./fields/SaveButton";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  open,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: Schema) {
    console.log("Sending data...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
    // update table data
  }

  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    role: useRef<HTMLInputElement>(null),
    submit: useRef<HTMLButtonElement>(null),
  };

  useEffect(() => {
    refs.name.current?.focus();
  }, [open]);

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<
      HTMLInputElement | HTMLButtonElement | HTMLSelectElement
    >
  ) {
    if (e.key === "Enter" && nextRef.current) {
      e.preventDefault();
      (nextRef.current as HTMLInputElement | HTMLButtonElement).focus();
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New User</DialogTitle>
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
            nextRef={refs.email}
          />

          <EmailField
            ref={refs.email}
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
            nextRef={refs.role}
          />

          <RoleField
            ref={refs.role}
            register={register}
            errors={errors}
            handleKeyDown={handleKeyDown}
            nextRef={refs.submit}
          />

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <SaveButton
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

export default CreateUserDialog;
