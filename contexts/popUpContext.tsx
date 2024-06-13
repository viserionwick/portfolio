// Essentials
import React, { createContext, useContext, useState } from 'react';

// Types
type PopUpOptions = {
    type: string;
    title?: string;
    description: string;
    duration?: number;
};

// Set Context
type PopUpContextType = {
    newPopUp: (options: PopUpOptions) => void;
};

const PopUpContext = createContext({} as PopUpContextType);

// Use Context
const usePopUpContext = () => useContext(PopUpContext);

// UI
import * as Toast from '@radix-ui/react-toast';

// Provider
const PopUpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // States
    const [open, setOpen] = useState<boolean>(false);
    
    const defaultOptions = {
        open: false,
        type: "error",
        title: "",
        description: "",
        duration: 3000
    }

    const [options, setOptions] = useState<PopUpOptions>(defaultOptions);


    // Functions
    const newPopUp = ( propOptions: PopUpOptions ): void => {

        const mergedOptions = {
            ...defaultOptions,
            ...propOptions
        };

        const { type, title, description, duration } = mergedOptions;

        setOptions({
            type,
            title,
            description,
            duration
        })

        setOpen(true);
    }


    const value = {
        newPopUp
    }

    return (
      <PopUpContext.Provider value={value}>
        <Toast.Provider>
            { children }
            <Toast.Root
                duration={ options.duration }
                className={`ToastRoot ${options.type}`}
                open={ open }
                onOpenChange={ setOpen }
            >
                {
                    options.type &&
                    <span className='ToastIcon'>
                        {
                            options.type === "error" ? <i className="fa-solid fa-xmark"></i> :
                            options.type === "warning" ? <i className="fa-solid fa-exclamation"></i> :
                            options.type === "success" ? <i className="fa-solid fa-check"></i> : <></>
                        }
                    </span>
                }
                {
                    options.title && <Toast.Title className='ToastTitle'>{ options.title }</Toast.Title>
                }
                {
                    options.description && <Toast.Description className='ToastDescription'>{ options.description }</Toast.Description>
                }
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
        </Toast.Provider>
      </PopUpContext.Provider>
    );
};


export { PopUpProvider, usePopUpContext };