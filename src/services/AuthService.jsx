// Função de login que verifica as credenciais e, se forem válidas, salva o token JWT no localStorage
export const login = (username, password) => {
    // Verifica se o nome de usuário e a senha são válidos
    if (username === 'admin' && password === 'password') {
        // Cria um cabeçalho e um payload para o JWT
        const header = { alg: 'HS256', typ: 'JWT' };
        const payload = { username, exp: Math.floor(Date.now() / 1000) + 60 * 60 }; // Expira em 1 hora
        const secret = 'secret-key'; // Chave secreta fictícia para fins educativos

        // Função auxiliar para codificar os dados em base64url
        const base64url = (source) => {
            return btoa(String.fromCharCode(...new Uint8Array(source)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        };

        // Função que cria o token JWT
        const createJWT = (header, payload, secret) => {
            const encodedHeader = base64url(new TextEncoder().encode(JSON.stringify(header)));
            const encodedPayload = base64url(new TextEncoder().encode(JSON.stringify(payload)));
            const signature = base64url(new TextEncoder().encode(`${encodedHeader}.${encodedPayload}.${secret}`)); // Simulação de assinatura

            return `${encodedHeader}.${encodedPayload}.${signature}`;
        };

        // Gera o token JWT
        const token = createJWT(header, payload, secret);

        // Salva o token no localStorage para indicar que o usuário está autenticado
        localStorage.setItem('token', token);
        return true;
    }

    // Se as credenciais forem inválidas, retorna false
    return false;
};

// Função de logout que remove o token JWT do localStorage
export const logout = () => {
    // Remove o token para encerrar a sessão do usuário
    localStorage.removeItem('token');
};

// Função que verifica se o usuário está autenticado
export const isAuthenticated = () => {
    // Verifica se há um token JWT no localStorage
    // Retorna true se o token existir, indicando que o usuário está autenticado
    return !!localStorage.getItem('token');
};