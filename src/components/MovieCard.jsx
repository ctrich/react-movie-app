/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import star from '../images/rating.png';
import noImage from '../images/noImage.webp';

const MovieCard = ({
  id, releaseDate, title, poster, rating, history, type, character,
}) => {
  const onClickShowDetails = () => {
    //history.push(`/details/${type === 'tv' ? type : 'movie'}/${id}`);
    history.push({
      pathname: `/details/${type === 'tv' ? type : 'movie'}`,
      search: `${id}`,
    });
  };

  return type === 'person' ? (
    <div style={{ margin: '10px' }} onClick={onClickShowDetails}>
      <div className="poster">
        {poster ? <img className="person-card" src={`http://image.tmdb.org/t/p/w185${poster}`} alt="poster" /> : <img className="no-pic" src={noImage} alt="poster" />}
      </div>
      <div>
        <h4>{title}</h4>
        <div>{character}</div>
      </div>
    </div>
  ) : (
    <div style={{ margin: '10px' }} onClick={onClickShowDetails}>
      <div className="poster">
        {poster ? <img src={`http://image.tmdb.org/t/p/w185${poster}`} alt="poster" /> : <img className="no-pic" src={noImage} alt="poster" />}
      </div>
      <div>
        <img className="rating-img" src={star} alt="star" />
        {rating === 0 ? 'n/a' : rating}
        <h3>{title}</h3>
        <div>{releaseDate}</div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  // history: PropTypes.objectOf(oneOfType([number, func, string, object])),
  releaseDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieCard;
