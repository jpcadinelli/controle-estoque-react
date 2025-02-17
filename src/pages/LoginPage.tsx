import React, { useState, useEffect } from 'react';
import authService from '../services/authServices';
import './LoginPage.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import AuthPopup from '../components/authPopups.tsx'
import getUsuarioLogadoServices from "../services/getUsuarioLogadoServices.ts";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    await getUsuarioLogadoServices.getUsuarioLogado();
                    navigate('/dashboard');
                } catch (error) {
                    console.log('Token inválido ou erro ao verificar:', error);
                }
            }
        };

        checkToken();
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const token = await authService.login(email, password);
            Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'Strict' });
            setMessage('Login realizado com sucesso!');
            setShowPopup(true);
            navigate('/dashboard');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setMessage('Falha ao fazer login. Verifique suas credenciais.');
            setShowPopup(true);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="login-form">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button onClick={handleLogin} type="submit">Entrar</button>
            </form>

            {showPopup && <AuthPopup message={message} onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default LoginPage;
