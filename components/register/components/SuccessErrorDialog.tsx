import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

interface SuccessErrorDialogProps {
  isSuccess: boolean;  
  message: string;     
  onClose: () => void; 
}

const SuccessErrorDialog: React.FC<SuccessErrorDialogProps> = ({ isSuccess, message, onClose }) => {
    console.log("SuccessErrorDialog run");
    
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isSuccess ? 'Success' : 'Error'}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessErrorDialog;