import { useState } from 'react'; // Importa o hook useState do React
import { login } from '../services/AuthService'; // Importa a função de login do AuthService
import styled from 'styled-components'; // Importa styled-components para estilizar os componentes

// Define o estilo do container principal do login
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

// Define o estilo do formulário de login
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// Define o estilo do campo de entrada
const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
`;

// Define o estilo do botão
const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

//Estiliza a mensagem de erro
const Error = styled.p`
    color: #E50914;
    font-size: 0.8em;
    font-weight: 600;
`;

// Componente principal de Login
// eslint-disable-next-line react/prop-types
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(''); // Define o estado para o nome de usuário
  const [password, setPassword] = useState(''); // Define o estado para a senha
  const [userError, setUserError] = useState(''); //Define o estado para a mensagem de erro no campo usuário
  const [passwordError, setPasswordError] = useState(''); //Define o estado para a mensagem de erro no campo senha

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tenta autenticar usando a função login do AuthService
    const isLoggedIn = login(username, password);

    if (isLoggedIn) {
      onLogin(); // Se o login for bem-sucedido, chama a função onLogin passada como prop
    } else {
      // Se o login falhar, exibe as mensagens de erro apropriadas
      if (username !== 'admin') {
        setUserError('Incorrect username.');
      } else {
        setUserError('');
      }
      if (password !== 'password') {
        setPasswordError('Incorrect password.');
      } else {
        setPasswordError('');
      }
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}> {/* Chama a função handleSubmit quando o botão de tipo 'submit' for clicado */}
        <h2>Login</h2>
        <Input
          type="text"
          value={username} // Valor do campo de entrada é ligado ao estado username
          onChange={(e) => setUsername(e.target.value)} // Atualiza o estado username conforme o usuário digita
          placeholder="Username" // Placeholder do campo de entrada
        />
        {userError && <Error>{userError}</Error>} {/* Mostra a mensagem de erro quando nome de usuário estiver incorreto */}
        <Input
          type="password"
          value={password} // Valor do campo de entrada é ligado ao estado password
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado password conforme o usuário digita
          placeholder="Password" // Placeholder do campo de entrada
        />
        {passwordError && <Error>{passwordError}</Error>} {/* Mostra a mensagem de erro quando a senha estiver incorreta */}
        <Button type="submit">Login</Button> {/* Botão que envia o formulário */}
      </LoginForm>
    </LoginContainer>
  );
};

export default Login; // Exporta o componente Login como padrão
