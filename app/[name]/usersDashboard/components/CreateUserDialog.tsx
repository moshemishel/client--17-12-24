import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    checkboxClasses,
} from '@mui/material';

interface CreateUserDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (userData: Record<string, any>) => void; // פונקציה לקבלת הנתונים החדשים
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ open, onClose, onSave }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: '',
        phone: '',

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
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                        variant='standard'
                        label="Name"
                        value={userData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        variant='standard'
                        label="Email"
                        value={userData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        type="email"
                        fullWidth
                        required
                    />
                    <TextField
                        variant='standard'
                        label="Role"
                        value={userData.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        variant='standard'
                        label="Phone"
                        value={userData.phone}
                        onChange={(e) => handleChange('role', e.target.value)}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateUserDialog;
