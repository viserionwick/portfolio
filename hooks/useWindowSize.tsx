// Essentials
import { useEffect, useState } from "react";

const useWindowSize = () => {
    const desktopWidth: number = 1440;
    const laptopWidth: number = 1024;
    const tabletWidth: number = 768;
    const mobileWidth: number = 425;

    const [isDesktop, setIsDesktop] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    
    
    
    const [windowSize, setWindowSize] = useState<{
        width: number,
        height: number,
        device: string
      }>({
        width: 0,
        height: 0,
        device: ""
      });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                ...windowSize,
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        
        window.addEventListener("resize", handleResize);
        handleResize();
        
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        const width = windowSize.width;
        let newDevice: string = "";

        if (width >= desktopWidth) { // desktop
            newDevice = 'desktop';

            setIsDesktop(true);
            setIsLaptop(false);
            setIsTablet(false);
            setIsMobile(false);
        } else if (width >= laptopWidth) { // laptop
            newDevice = 'laptop';

            setIsDesktop(false);
            setIsLaptop(true);
            setIsTablet(false);
            setIsMobile(false);
        } else if (width >= tabletWidth) { // tablet
            newDevice = 'tablet';

            setIsDesktop(false);
            setIsLaptop(false);
            setIsTablet(true);
            setIsMobile(false);
        } else if (width < tabletWidth) { // mobile
            newDevice = 'mobile';

            setIsDesktop(false);
            setIsLaptop(false);
            setIsTablet(false);
            setIsMobile(true);
        }

        if (newDevice !== windowSize.device) {
            setWindowSize(prevState => ({
                ...prevState,
                device: newDevice
            }));
        }

    }, [windowSize.width]);

    return {
        windowSize,
        isDesktop,
        isLaptop,
        isTablet,
        isMobile
    };
}

export default useWindowSize