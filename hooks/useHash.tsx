// Essentials
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const useHash = () => {

    const router = useRouter();
    const [hash, setHash] = useState('');

    useEffect(() => {
        // Extract the hash from the URL
        const currentHash = router.asPath.split('#')[1] || '';
        setHash(currentHash);
    
        const handleRouteChange = (url: any) => {
          const newHash = url.split('#')[1] || '';
          setHash(newHash);
        };
    
        // Listen for hash changes
        router.events.on('hashChangeStart', handleRouteChange);
    
        // Clean up the event listener
        return () => {
          router.events.off('hashChangeStart', handleRouteChange);
        };
      }, [router]);


    return {
        hash
    }
}

export default useHash; 