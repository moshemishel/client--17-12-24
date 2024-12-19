import React, { useState } from 'react';
import { Button } from '@mui/material';
import CreateUserDialog from './createUserDialog';

const UsersDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSaveUser = (userData: Record<string, any>) => {
    console.log('New User Data:', userData);
    // שלב זה ניתן להוסיף קריאה ל-API לשמירת היוזר החדש
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog}>
        Create New User
      </Button>
      <CreateUserDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveUser}
      />
    </>
  );
};

export default UsersDashboard;