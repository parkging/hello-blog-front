import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Movie({ id, title, summary, coverImage }) {
  return (
    <li>
      <div>
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <p>{summary}</p>
        <img src={coverImage} />
      </div>
    </li>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  coverImage: PropTypes.string,
};

export default Movie;
