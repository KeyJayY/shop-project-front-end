import { Routes, Route } from 'react-router-dom';
import MainPage from "./MainPage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import { AuthProvider, useAuth } from "./AuthProvider.jsx";
import {useEffect, useState} from "react";
import {verifyToken} from "./verifyToken.js";
import ProductPage from "./ProductPage.jsx";

function App() {

    const [loading, setLoading] = useState(true);
    const { login, logout } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            verifyToken(token).then((isValid) => {
                isValid ? login(token) : logout();
            });
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
    );
}

export default function Root(){
    return (
        <AuthProvider>
            <App/>
        </AuthProvider>
    )
};