import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);

    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{movie.title_long}</h1>
          <img src={movie.medium_cover_image} />
          <p>rating: {movie.rating}</p>
          <p> {movie.description_full}</p>
          <ul>
            {movie.torrents?.map((obj) => {
              console.log(obj);
              return (
                <li>
                  torrent: <a href={obj.url}>{obj.url}</a>
                  <div>hash: {obj.hash}</div>
                  <div>quality: {obj.quality}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Detail;
