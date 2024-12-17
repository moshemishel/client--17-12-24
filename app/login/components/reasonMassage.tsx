"use client";
import { Alert, AlertTitle } from "@mui/material";

const ReasonMessage = ({ reason }: { reason: string | null }) => {


  const getReasonMessage = (reason: string | null) => {
    switch (reason) {
      case "unauthorized":
        return "You do not have permission to view this page. Please log in first.";
      case "session-expired":
        return "Your session has expired. Please log in again.";
      case "login_required":
        return "You need to log in to access this page. This page is for registered users only. Please log in first.";
      case "account_mismatch":
        return "You are attempting to access an account that is not yours. Please log in with the correct credentials.";  default:
        return null;
    }
  };

  const message = getReasonMessage(reason);

  

  if (!message) return null;

  return (
    <Alert severity="warning" sx={{ marginBottom: 2 }}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default ReasonMessage;