import React from 'react';
import Cookies from 'js-cookie'

const SuccessPage: React.FC = () => {
    // Recuperando o token do cookie
    const retrievedToken: string | undefined = Cookies.get('token');

    if (retrievedToken) {
        console.log('Token recuperado:', retrievedToken);
    } else {
        console.log('Nenhum token encontrado.');
    }

    return (
        <div className="success-container">
            <h1>Login bem-sucedido!</h1>
            <p>Bem-vindo à aplicação.</p>
        </div>
    );
};

export default SuccessPage;
