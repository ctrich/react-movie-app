import React, { useState } from 'react';
import PropTypes, {
  func, oneOfType, string, object, number,
} from 'prop-types';
import '../style/search.css';

const Search = (props) => {
  const [term, setTerm] = useState('');
  const onChangeUpdate = (e) => {
    setTerm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/search?q=${term}`);
  };

  return (
    <div className="search-container">
      <form method="GET" action="/search" value={term} name="search" onSubmit={onSubmit} className="search-form">
        <input
          onChange={onChangeUpdate}
          name="q"
          value={term}
          className="search-input"
          type="text"
          placeholder="Search for a movie, tv show, person..."
        />
      </form>
    </div>
  );
};

Search.propTypes = {
  history: PropTypes.objectOf(oneOfType([number, func, string, object])).isRequired,
};

export default Search;
