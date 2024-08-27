import NavBar from './NavBar'; // Importa o componente NavBar
import Footer from './Footer'; // Importa o componente Footer
import styled from 'styled-components'; // Importa a biblioteca styled-components para estilização

// Estilização do contêiner principal do aplicativo
const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;

// Estilização da área de conteúdo principal
const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

// Componente Layout encapsula a estrutura principal do aplicativo
const Layout = ({ isAuthenticated, isNavBarOpen, toggleNavBar, handleAccess, handleLogout, children }) => (
  <AppContainer>
    {isAuthenticated && (
      <>
        {/* Exibe a NavBar e Footer se o usuário estiver autenticado */}
        <NavBar
          isOpen={isNavBarOpen}
          toggleNavBar={toggleNavBar}
          handleAccess={handleAccess}
          handleLogout={handleLogout}
        />
        <Footer />
      </>
    )}
    {/* Área de conteúdo principal */}
    <MainContent>{children}</MainContent>
  </AppContainer>
);

export default Layout;