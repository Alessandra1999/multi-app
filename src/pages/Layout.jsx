import NavBar from "./NavBar";
import Footer from "./Footer";
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;

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

const Layout = ({ isAuthenticated, isNavBarOpen, toggleNavBar, handleAccess, handleLogout, children }) => (
    <AppContainer>
      {isAuthenticated && (
        <>
          <NavBar
            isOpen={isNavBarOpen}
            toggleNavBar={toggleNavBar}
            handleAccess={handleAccess}
            handleLogout={handleLogout}
          />
          <Footer />
        </>
      )}
      <MainContent>{children}</MainContent>
    </AppContainer>
  );
  
  export default Layout;