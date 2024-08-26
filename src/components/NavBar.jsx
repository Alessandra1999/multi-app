import { FaQrcode, FaSearch, FaTasks, FaRegQuestionCircle, FaGlobeAmericas, FaNetworkWired } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Estiliza a barra de navegação.
const NavBarContainer = styled.div`
  width: 240px;
  background-color: #2c3e50;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 3px 0 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
`;

// Estiliza os links na barra de navegação.
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #34495e;
    color: #ecf0f1;
  }
`;

//Estiliza o botão de Logout
const LogoutButton = styled.button`
    margin-top: 20px;
    color: white;
    background-color: transparent;
    border: none;
`;

const NavBar = ({ isOpen, handleAccess, handleLogout }) => {
    return (
        <NavBarContainer isOpen={isOpen}>
          <StyledLink onClick={() => handleAccess(0, "QRCodeGenerator")}>
            <FaQrcode />
            QR Code Generator
          </StyledLink>
          <StyledLink onClick={() => handleAccess(1, "IPAddressFinder")}>
            <FaNetworkWired />
            IP Address Finder
          </StyledLink>
          <StyledLink onClick={() => handleAccess(2, "MovieSearchEngine")}>
            <FaSearch />
            Movie Search
          </StyledLink>
          <StyledLink onClick={() => handleAccess(3, "TodoApp")}>
            <FaTasks />
            Todo App
          </StyledLink>
          <StyledLink onClick={() => handleAccess(4, "QuizApp")}>
            <FaRegQuestionCircle />
            Quiz App
          </StyledLink>
          <StyledLink onClick={() => handleAccess(5, "LanguageTranslator")}>
            <FaGlobeAmericas />
            Translator
          </StyledLink>
          <LogoutButton
            onClick={handleLogout} >
            Logout
          </LogoutButton>
        </NavBarContainer>
      );
}

export default NavBar