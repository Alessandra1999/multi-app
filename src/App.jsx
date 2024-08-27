import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import ComponentRenderer from "./pages/Renderer";
import AppCarousel from "./components/AppCarousel";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./App.css";

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
      <Layout
        isAuthenticated={isAuthenticated}
        isNavBarOpen={isNavBarOpen}
        toggleNavBar={toggleNavBar}
        handleAccess={handleAccess}
        handleLogout={handleLogout}
      >
        <Routes>
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
          <Route
            path="/content"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
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
          <Route path="*" element={<Navigate to={isAuthenticated ? "/content" : "/"} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;