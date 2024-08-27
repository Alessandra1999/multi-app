import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import AppCarousel from "./components/AppCarousel";
import QRCodeGenerator from "./components/QRCodeGenarator";
import IPAddressFinder from "./components/IPAddressFinder";
import MovieSearchEngine from "./components/MovieSearchEngine";
import TodoApp from "./components/TodoApp";
import QuizApp from "./components/QuizApp";
import LanguageTranslator from "./components/LanguageTranslator";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

const ReturnButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleAccess = (index, component) => {
    setCurrentComponent(component);
    setCarouselIndex(index);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentComponent(null);
  };

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  return (
    <Router>
      <AppContainer>
        {isAuthenticated && (
          <>
            <NavBar
              isOpen={isNavBarOpen}
              handleAccess={handleAccess}
              handleLogout={handleLogout}
              toggleNavBar={toggleNavBar}
            />
            <Footer />
          </>
        )}
        <MainContent>
          <Routes>
            {/* Rota para login */}
            <Route path="/" element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/content" />} />

            {/* Rota protegida */}
            <Route
              path="/content"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <>
                    {currentComponent ? (
                      <>
                        {currentComponent === "QRCodeGenerator" && <QRCodeGenerator />}
                        {currentComponent === "IPAddressFinder" && <IPAddressFinder />}
                        {currentComponent === "MovieSearchEngine" && <MovieSearchEngine />}
                        {currentComponent === "TodoApp" && <TodoApp />}
                        {currentComponent === "QuizApp" && <QuizApp />}
                        {currentComponent === "LanguageTranslator" && <LanguageTranslator />}
                        <ReturnButton onClick={() => setCurrentComponent(null)}>
                          Voltar
                        </ReturnButton>
                      </>
                    ) : (
                      <AppCarousel
                        carouselIndex={carouselIndex}
                        handleAccess={handleAccess}
                        setCarouselIndex={setCarouselIndex}
                      />
                    )}
                  </>
                </ProtectedRoute>
              }
            />

            {/* Redirecionamento para login se não autenticado */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/content" : "/"} />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;