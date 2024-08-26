import { Navigate } from "react-router-dom";

//Componente que protege rotas baseadas no estado de autenticação
const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) { //Verifica se o usuário está autenticado
        return <Navigate to="/" replace />; //Caso não esteja autenticado, redireciona para a página de login
    }

    return children; //Se estiver autenticado, renderiza os componentes filhos passados para esta rota;
}

export default ProtectedRoute //exporta o componente ProtectedRoute como padrão