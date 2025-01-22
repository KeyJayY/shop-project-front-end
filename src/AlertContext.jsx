import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ message: '', type: '', visible: false });

    const showAlert = (message, type = 'info') => {
        setAlert({ message, type, visible: true });
        setTimeout(hideAlert, 5000);
    };

    const hideAlert = () => {
        setAlert({ ...alert, visible: false });
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
