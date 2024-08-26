import { useState } from 'react'; // Importa o hook useState do React
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import styled from 'styled-components'; // Importa styled-components para estilizar os componentes

// Define o estilo do container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 50px auto;
`;

// Define o estilo do título
const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

// Define o estilo do campo de entrada
const Input = styled.input`
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Define o estilo do botão
const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Define o estilo do container dos filmes
const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  max-height: 500px; /* Ajuste a altura máxima conforme necessário */
  overflow-y: auto; /* Adiciona rolagem vertical se necessário */
  width: 100%;
`;

// Define o estilo do cartão de filme
const MovieCard = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 180px; /* Ajuste a largura conforme necessário */
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  img {
    border-radius: 10px;
    max-width: 100%; /* Ajusta o tamanho da imagem para caber dentro do cartão */
    height: auto;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;

// Componente principal MovieSearchEngine
const MovieSearchEngine = () => {
  const [query, setQuery] = useState(''); // Define o estado para a consulta de busca
  const [movies, setMovies] = useState([]); // Define o estado para armazenar os filmes

  // Função para buscar filmes na API do TMDB
  const searchMovies = async () => {
    try {
      const apiKey = '203dd822d15a1f865449d36d87bcb080'; // Substitua pela sua chave da API do TMDB
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
      const movieResults = response.data.results;

      // Obtém os detalhes adicionais de cada filme
      const moviesWithDetails = await Promise.all(
        movieResults.map(async (movie) => {
          const detailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=credits`);
          return {
            ...movie,
            runtime: detailsResponse.data.runtime,
            cast: detailsResponse.data.credits.cast.slice(0, 5), // Obtém os primeiros 5 membros do elenco
            vote_average: detailsResponse.data.vote_average,
          };
        })
      );

      setMovies(moviesWithDetails); // Armazena os dados dos filmes com detalhes no estado movies
    } catch (error) {
      console.error("Error fetching movie data:", error); // Exibe um erro no console em caso de falha
    }
  };

  return (
    <Container>
      <Title>Movie Search Engine</Title>
      <Input
        type="text"
        value={query} // Valor do campo de entrada é ligado ao estado query
        onChange={(e) => setQuery(e.target.value)} // Atualiza o estado query conforme o usuário digita
        placeholder="Search for a movie" // Placeholder do campo de entrada
      />
      <Button onClick={searchMovies}>Search</Button> {/* Botão que chama a função searchMovies quando clicado */}
      <MoviesContainer>
        {movies && movies.map((movie) => ( // Verifica se há filmes e os mapeia para exibir MovieCard
          <MovieCard key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} /> {/* Exibe o pôster do filme */}
            <h3>{movie.title}</h3> {/* Exibe o título do filme */}
            <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p> {/* Exibe a data de lançamento do filme */}
            <p><strong>Duration:</strong> {movie.runtime} minutes</p> {/* Exibe a duração do filme */}
            <p><strong>Rating:</strong> {movie.vote_average}/10</p> {/* Exibe a avaliação do filme */}
            <p><strong>Cast:</strong> {movie.cast.map(actor => actor.name).join(', ')}</p> {/* Exibe os principais atores */}
          </MovieCard>
        ))}
      </MoviesContainer>
    </Container>
  );
};

export default MovieSearchEngine; // Exporta o componente MovieSearchEngine como padrão
