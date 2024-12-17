import { useEffect } from 'react';
import { getAuthCookie, setAuthCookie, removeAuthCookie } from './cookieUtils'; 
import { useRouter } from 'next/navigation';

const useIdleLogout = () => {
  const router = useRouter();
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let lastActivityTime = Date.now(); 

    const handleActivity = () => {
      const currentTime = Date.now();
      
      if (currentTime - lastActivityTime > 5 * 60 * 1000) {
        const user = getAuthCookie();
        if (user) {
          setAuthCookie(user);
        }
      }
      lastActivityTime = currentTime;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        removeAuthCookie();
        router.replace('/login'); 
      }, 10 * 60 * 1000); 
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [router]);

};

export default useIdleLogout;