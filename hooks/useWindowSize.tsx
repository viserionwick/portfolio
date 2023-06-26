// Essentials
import { useEffect, useState } from "react";

const useWindowSize = () => {
    const desktop: number = 1440;
    const laptop: number = 1024;
    const tablet: number = 768;
    const mobile: number = 425;
    
    
    const [windowSize, setWindowSize] = useState<{
        width: number,
        height: number,
      }>({
        width: 0,
        height: 0,
      });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        
        window.addEventListener("resize", handleResize);
        handleResize();
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        windowSize,
        desktop,
        laptop,
        tablet,
        mobile
    };
}

export default useWindowSize