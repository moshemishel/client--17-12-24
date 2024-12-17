'use client';
import { Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

const AuthButtons = () => {
    const pathname = usePathname(); 

    const isSuperAdminRoute = (pathname: string | undefined) => pathname?.startsWith('/superAdmin');

    if (isSuperAdminRoute(pathname)) {
        return null;
    }


    return (
        <>
            <Link href="/login">
                <Button sx={{ marginLeft: 'auto' }} variant="contained">
                    Login
                </Button>
            </Link>
            <Link href="/register">
                <Button sx={{ marginLeft: '10px' }} variant="contained">
                    SignUp
                </Button>
            </Link>
        </>
    );
};

export default AuthButtons;