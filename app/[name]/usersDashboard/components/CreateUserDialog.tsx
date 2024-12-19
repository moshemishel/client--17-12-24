import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (userData: Record<string, any>) => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ open, onClose, onSave }) => {
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    state: '',
  });

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(userData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle style={{ fontSize: '1.8rem', fontWeight: 600 }}>Create New User</DialogTitle>
      <DialogContent>
        <TextField
          label="Id"
          value={userData.id}
          onChange={(e) => handleChange('id', e.target.value)}
          margin="dense"
          fullWidth
        />
        <TextField
          label="First Name *"
          value={userData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          margin="dense"
          fullWidth
          required
        />
        <TextField
          label="Last Name *"
          value={userData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          margin="dense"
          fullWidth
          required
        />
        <TextField
          label="Email *"
          type="email"
          value={userData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          margin="dense"
          fullWidth
          required
        />
        <TextField
          label="State"
          value={userData.state}
          onChange={(e) => handleChange('state', e.target.value)}
          margin="dense"
          select
          fullWidth
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          CANCEL
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;