'use client';
import { useState } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import RegisterDialog from './register/RegisterDialog';

const AuthButtons = () => {
    const pathname = usePathname(); 
    const isSuperAdminRoute = (pathname: string | undefined) => pathname?.startsWith('/superAdmin');
    
    if (isSuperAdminRoute(pathname)) {
        return null;
    };
    const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsSignUpDialogOpen(true);
      };
    
      const handleCloseDialog = () => {
        setIsSignUpDialogOpen(false);
      };


    return (
        <>
            <Link href="/login">
                <Button sx={{ marginLeft: 'auto' }} variant="contained">
                    Login
                </Button>
            </Link>
                <Button sx={{ marginLeft: '10px' }} variant="contained" onClick={handleOpenDialog}>
                    SignUp
                </Button>

            {isSignUpDialogOpen && <RegisterDialog onClose={handleCloseDialog} />}
        </>
    );
};

export default AuthButtons;