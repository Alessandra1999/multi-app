import QRCodeGenerator from "../components/QRCodeGenarator";
import IPAddressFinder from "../components/IPAddressFinder";
import MovieSearchEngine from "../components/MovieSearchEngine";
import TodoApp from "../components/TodoApp";
import QuizApp from "../components/QuizApp";
import LanguageTranslator from "../components/LanguageTranslator";
import styled from "styled-components";

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

const ComponentRenderer = ({ currentComponent, onReturn }) => (
  <>
    {currentComponent === 'QRCodeGenerator' && <QRCodeGenerator />}
    {currentComponent === 'IPAddressFinder' && <IPAddressFinder />}
    {currentComponent === 'MovieSearchEngine' && <MovieSearchEngine />}
    {currentComponent === 'TodoApp' && <TodoApp />}
    {currentComponent === 'QuizApp' && <QuizApp />}
    {currentComponent === 'LanguageTranslator' && <LanguageTranslator />}
    <ReturnButton onClick={onReturn}>Return</ReturnButton>
  </>
);

export default ComponentRenderer;