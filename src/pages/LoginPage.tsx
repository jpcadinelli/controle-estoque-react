import React, { useState } from 'react';
import authService from '../services/authServices'; // Certifique-se de importar o serviço corretamente
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Limpar qualquer erro anterior
        setError(null);

        try {
            // Usando o serviço de autenticação para fazer o login
            const token = await authService.login(email, password);

            // Armazenar o token no localStorage
            localStorage.setItem('authToken', token);

            // Redirecionar para a página de sucesso
            window.location.href = '/success'; // Ou use React Router se necessário
        } catch (err) {
            // Exibir erro se a autenticação falhar
            setError('Falha ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin} className="login-form">
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
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LoginPage;
