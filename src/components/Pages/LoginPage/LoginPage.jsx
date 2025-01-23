import Header from '@components/Layout/Header';
import stylesLoginPage from './LoginPage.module.scss';
import {useState} from 'react';
import axios from 'axios';
import {useAuth} from '@src/AuthProvider.jsx';
import {Navigate} from "react-router-dom";
import FormGroup from '@components/Common/FormGroup';
import {useAlert} from "@src/AlertContext.jsx"

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Stan do przechowywania komunikatu o błędzie
    const {isAuthenticated, login} = useAuth();

    const {showAlert} = useAlert();

    if (isAuthenticated) {
        return <Navigate to="/"/>; // Przekierowanie, jeśli użytkownik jest zalogowany
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', {
                username,
                password,
            });
            login(response.data.token);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                showAlert("Niepoprawny login lub hasło. Spróbuj ponownie.", "error");
            } else {
                showAlert("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.", "error");
                console.error(err);
            }
        }
    };

    return (
        <>
            <Header userBar={false}/>
            <main className={stylesLoginPage.main}>
                <div className={stylesLoginPage.loginContainer}>
                    <form className={stylesLoginPage.loginForm} onSubmit={handleLogin}>
                        <h2 className={stylesLoginPage.formTitle}>Logowanie</h2>
                        {/* Komunikat o błędzie */}
                        {errorMessage && <p className={stylesLoginPage.errorMessage}>{errorMessage}</p>}
                        <FormGroup type="text" name="login" label="Email" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        <FormGroup type="password" name="password" label="Hasło" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        <input type="submit" className={stylesLoginPage.submitButton} value="Zaloguj"/>
                    </form>
                </div>
            </main>
        </>
    );
}

export default LoginPage;
