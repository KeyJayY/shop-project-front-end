import Header from '@components/Layout/Header';
import stylesLoginPage from './LoginPage.module.scss'
import {useState} from 'react';
import axios from 'axios';
import {useAuth} from '@src/AuthProvider.jsx';
import {Navigate} from "react-router-dom";
import FormGroup from '@components/Common/FormGroup';


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {isAuthenticated, login} = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/"/>;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', {
                username,
                password,
            });
            login(response.data.token);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header userBar={false}/>
            <main className={stylesLoginPage.main}>
                <div className={stylesLoginPage.loginContainer}>
                    <form className={stylesLoginPage.loginForm} onSubmit={handleLogin}>
                        <h2 className={stylesLoginPage.formTitle}>Logowanie</h2>
                        <FormGroup type="text" name="login" label="email" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        <FormGroup type="password" name="password" label="Hasło" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        <input type="submit" className={stylesLoginPage.submitButton} value="Zaloguj"/>
                    </form>
                </div>
            </main>
        </>
    )
}

export default LoginPage;