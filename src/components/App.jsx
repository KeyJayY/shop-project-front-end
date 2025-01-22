import { Routes, Route } from 'react-router-dom';
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import AdminPanelPage from "./Pages/AdminPanelPage";
import { AuthProvider, useAuth } from "@src/AuthProvider.jsx";
import {useEffect, useState} from "react";
import {verifyToken} from "@utils/verifyToken.js";
import ProductPage from "./Pages/ProductPage";
import UserPage from "./Pages/UserPage";
import {AlertProvider} from "@src/AlertContext.jsx";
import Alert from "./Common/Alert"

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
            <Route path="/userPage" element={<UserPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/adminPanel" element={<AdminPanelPage />} />
        </Routes>
    );
}

export default function Root(){
    return (
        <AuthProvider>
        <AlertProvider>
            <Alert/>
            <App/>
        </AlertProvider>
        </AuthProvider>
    )
};