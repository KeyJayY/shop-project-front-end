import Header from '@components/Layout/Header';
import stylesRegisterPage from './RegisterPage.module.scss';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import FormGroup from "@components/Common/FormGroup";
import {useAlert} from "@src/AlertContext.jsx"

function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
    });

    const {showAlert} = useAlert();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { confirmPassword, ...dataToSend } = formData;

        if (formData.password === confirmPassword) {
            try {
                const result = await axios.post("/auth/register", dataToSend);

                if (result.status === 200) {
                    navigate('/login');
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    showAlert("Email jest juz zajety", "error");
                } else {
                    showAlert("Nie udało się stworzyć konta", "error");
                    console.error(error);
                }
            }
        } else {
            showAlert("Passwords do not match. Please check your input.", "error");
        }
    };


    return (
        <>
            <Header userBar={false}/>
            <main className={stylesRegisterPage.main}>
                <div className={stylesRegisterPage.registrationContainer}>
                    <form onSubmit={handleSubmit} className={stylesRegisterPage.registrationForm}>
                        <h1 className={stylesRegisterPage.formTitle}>Rejestracja</h1>
                        <FormGroup name="firstName" type="text" label="Imię" value={formData.firstName} onChange={handleChange} />
                        <FormGroup name="lastName" type="text" label="Nazwisko" value={formData.lastName} onChange={handleChange} />
                        <FormGroup name="email" type="email" label="Email" value={formData.email} onChange={handleChange} />
                        <FormGroup name="address" type="text" label="Adres" value={formData.address} onChange={handleChange} />
                        <FormGroup name="city" type="text" label="Miasto" value={formData.city} onChange={handleChange} />
                        <FormGroup name="dateOfBirth" type="date" label="Data urodzenia" value={formData.dateOfBirth} onChange={handleChange} />
                        <FormGroup name="password" type="password" label="Hasło" value={formData.password} onChange={handleChange} />
                        <FormGroup name="confirmPassword" type="password" label="Potwierdź hasło" value={formData.confirmPassword} onChange={handleChange} />
                        <input type="submit" className={stylesRegisterPage.submitButton}/>
                    </form>
                </div>
            </main>
        </>
    );
}

export default RegisterPage;
