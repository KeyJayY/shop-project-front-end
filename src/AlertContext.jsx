import { createContext, useState, useContext, useCallback } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ message: "", type: "" });

    const showAlert = useCallback((message, type = "info") => {
        setAlert({ message, type });

        setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    }, []);

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <Alert message={alert.message} type={alert.type} />
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);

const Alert = ({ message, type }) => {
    if (!message) return null;

    const styles = {
        container: {
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            backgroundColor: type === "error" ? "#f8d7da" : "#d4edda",
            color: type === "error" ? "#721c24" : "#155724",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
        },
    };

    return <div style={styles.container}>{message}</div>;
};
