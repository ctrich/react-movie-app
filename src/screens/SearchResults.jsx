import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes, { string } from 'prop-types';
import '../style/searchResults.css';
import * as CONST from '../util/const';
import MovieCard from '../components/MovieCard';

const SearchResults = ({ location, history }) => {
  const [data, setData] = useState([]);
  const [heightClass, setHeightClass] = useState('min-height');
  const search = location.search.slice(3);

  useEffect(() => {
    axios.get(CONST.BASE + CONST.SEARCH, {
      params: {
        api_key: CONST.API_KEY,
        query: search,
      },
    }).then((results) => {
      setData(results.data);
      if (results.data.results.length > 10) {
        setHeightClass('max-height');
      } else {
        setHeightClass('min-height');
      }
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }, [search]);

  function renderResults() {
    return !data.results ? '' : data.results.map((item) => {
      console.log(item);
      const type = item.media_type;
      const releaseDate = type === 'movie' ? item.release_date : item.first_air_date;
      const title = type === 'movie' ? item.title : item.name;
      const posterPath = type === 'person' ? item.profile_path : item.poster_path;
      const rating = type !== 'person' ? item.vote_average : '';
      return (
        <div className="result-item" key={item.id}>
          <MovieCard
            type={type}
            history={history}
            id={item.id}
            releaseDate={releaseDate}
            title={title}
            poster={posterPath}
            rating={rating}
          />
        </div>
      );
    });
  }

  return (
    <div className={`results-container ${heightClass}`}>
      <div className="results">
        {renderResults()}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  location: PropTypes.objectOf(string).isRequired,
};

export default SearchResults;
