import axios from 'axios';

const login = async (email: string, password: string) => {
    try {
        // Fazendo a requisição POST ao backend
        const response = await axios.post('http://localhost:8080/api/v1/login', {
            email,
            senha: password,
        });

        // Retorna o token recebido
        return response.data.token;
    } catch (error) {
        // Lançar erro caso a requisição falhe
        throw new Error('Erro ao fazer login');
    }
};

export default {
    login,
};
