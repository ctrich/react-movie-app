/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes, {
  objectOf, string, oneOfType, number, bool, array,
} from 'prop-types';
import '../style/scroller.css';
// import star from '../images/rating.png';
import MovieCard from './MovieCard';
//  to do: Send id to moviecard to send to details screen
const Scroller = ({ list, history, type }) => {
  function renderList() {
    return list.map((movie) => {
      const mediaType = !type ? movie.media_type || '' : type;
      const releaseDate = mediaType === 'movie' || mediaType === '' ? movie.release_date : mediaType === 'person' ? null : movie.first_air_date;
      const title = mediaType === 'movie' || mediaType === '' ? movie.title : movie.name;
      const poster = mediaType === 'person' ? movie.profile_path : movie.poster_path;
      const rating = mediaType === 'person' ? '' : movie.vote_average;
      const character = mediaType === 'person' ? movie.character : '';
      return (
        <div>
          <MovieCard
            history={history}
            type={mediaType}
            id={movie.id}
            releaseDate={releaseDate}
            title={title}
            poster={poster}
            rating={rating}
            character={character}
          />
        </div>
      );
    });
  }

  return (
    <div className="scroll-container">
      {renderList()}
    </div>
  );
};

Scroller.propTypes = {
  list: PropTypes.arrayOf(objectOf(oneOfType([number, string, bool, array]))).isRequired,
};

export default Scroller;
