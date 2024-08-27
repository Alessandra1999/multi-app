import { useState } from "react"; // Importa o hook useState para gerenciar estados locais
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Importa componentes para roteamento
import Layout from "./pages/Layout"; // Importa o componente Layout
import ComponentRenderer from "./pages/Renderer"; // Importa o componente ComponentRenderer
import AppCarousel from "./components/AppCarousel"; // Importa o componente AppCarousel
import Login from "./pages/Login"; // Importa a página de login
import ProtectedRoute from "./pages/ProtectedRoute"; // Importa a rota protegida 
import "./App.css"; // Importa os estilos globais

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para gerenciar se o usuário está autenticado
  const [isNavBarOpen, setIsNavBarOpen] = useState(false); // Estado para gerenciar se a NavBar está aberta
  const [currentComponent, setCurrentComponent] = useState(null); // Estado para gerenciar qual componente deve ser exibido
  const [carouselIndex, setCarouselIndex] = useState(0); // Estado para gerenciar o índice do carousel

  // Função para definir o componente atual baseado na seleção do usuário no carousel
  const handleAccess = (index, component) => {
    setCurrentComponent(component);
    setCarouselIndex(index);
  };

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentComponent(null);
  };

  // Função para alternar a exibição da NavBar
  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  return (
    <Router>
      {/* Usa o Layout para encapsular toda a estrutura da aplicação */}
      <Layout
        isAuthenticated={isAuthenticated}
        isNavBarOpen={isNavBarOpen}
        toggleNavBar={toggleNavBar}
        handleAccess={handleAccess}
        handleLogout={handleLogout}
      >
        <Routes>
          {/* Rota para a página de login */}
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Login onLogin={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/content" />
              )
            }
          />
          {/* Rota protegida para o conteúdo principal */}
          <Route
            path="/content"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                {/* Renderiza o ComponentRenderer ou o carousel baseado no estado */}
                {currentComponent ? (
                  <ComponentRenderer
                    currentComponent={currentComponent}
                    onReturn={() => setCurrentComponent(null)}
                  />
                ) : (
                  <AppCarousel
                    carouselIndex={carouselIndex}
                    handleAccess={handleAccess}
                    setCarouselIndex={setCarouselIndex}
                  />
                )}
              </ProtectedRoute>
            }
          />
          {/* Redireciona para a página de login se a rota não for encontrada */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/content" : "/"} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;