import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {verifyToken} from "./verifyToken.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            verifyToken(token).then((isValid) => {
                if (isValid) {
                    setIsAuthenticated(true);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token) => {
        setIsAuthenticated(true);
        console.log("login function");
        localStorage.setItem("token", token);
    }
    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);