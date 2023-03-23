import { useEffect, useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <h1>{movies.length}</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {movies.map((movie) => {
            console.log(movie);
            return (
              <li key={movie.id}>
                <div>
                  <h2>{movie.title}</h2>
                  <p>{movie.summary}</p>
                  <img src={movie.medium_cover_image} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default App;
