/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import '../style/slider.css';
import axios from 'axios';
import PropTypes, {
  objectOf, string, oneOfType, number, array, bool,
} from 'prop-types';
import PlayButton from '../images/playButton.png';
import * as CONST from '../util/const';

const Slider = ({ list }) => {
  const [videos, setVideos] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  useEffect(() => {
    const promises = list.map(async (movie) => {
      const mediaType = movie.media_type;
      const videoURL = mediaType === 'movie' ? `${CONST.BASE}/movie/${movie.id}/videos` : `${CONST.BASE}/tv/${movie.id}/videos`;

      return axios.get(videoURL, { params: { api_key: CONST.API_KEY } })
        .then((res) => res.data);
    });

    axios.all(promises).then(axios.spread((...results) => {
      setVideos(results);
    })).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }, [list]);

  const onClickShowVideo = () => {
    setHidden(!hidden);
  };

  const onClickMoveRight = () => {
    if (slideNumber < list.length - 1) {
      document.getElementById('slider').animate([{ transform: `translateX(${slideNumber * -100}%)` },
        { transform: `translateX(${(slideNumber + 1) * -100}%)` }],
      { duration: 400, fill: 'forwards' });

      setSlideNumber(slideNumber + 1);
    }
  };

  const onClickMoveLeft = () => {
    if (slideNumber > 0) {
      document.getElementById('slider').animate([{ transform: `translateX(${(slideNumber) * -100}%)` },
        { transform: `translateX(${(slideNumber - 1) * -100}%)` }],
      { duration: 400, fill: 'forwards' });
      setSlideNumber(slideNumber - 1);
    }
  };

  function renderList() {
    return list.map((movie, index) => {
      const video = videos[index];
      const videoResults = video ? videos[index].results[0] : '';
      const name = videoResults ? videoResults.name : '';
      const videoUrl = videoResults ? videoResults.key : '';

      return !hidden ? (
        <div className="slider-card" key={movie.id}>
          <div>
            <img
              className="slider-backdrop"
              src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
              alt="backdrop"
            />
          </div>
          <div>
            <img
              className="slider-poster"
              src={`http://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="poster"
            />
            <input
              className="slider-play"
              onClick={onClickShowVideo}
              type="image"
              src={PlayButton}
              alt={movie.name}
            />
            <h3>{name}</h3>
          </div>
        </div>
      )
        : (
          <div className="slider-card" key={movie.id}>
            <button
              id="video-back-button"
              type="button"
              onClick={onClickShowVideo}
              className="slider-back-btn"
            >
              Back
            </button>
            <br />
            <div className="video-wrapper">
              <iframe
                id="video"
                width="840"
                title={movie.name}
                height="486"
                src={`https://www.youtube.com/embed/${videoUrl}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        );
    });
  }

  return (

    <div className="slider">
      {!hidden ? (
        <div className="arrow-container left-arrow" role="button" tabIndex={0} onClick={onClickMoveLeft}>
          <i className="arrow left" />
        </div>
      ) : ''}
      <div className="slides-container">
        <div id="slider">
          {renderList()}
        </div>
      </div>
      {!hidden ? (
        <div className="arrow-container right-arrow" role="button" tabIndex={0} onClick={onClickMoveRight}>
          <i className="arrow right" />
        </div>
      ) : ''}
    </div>
  );
};

Slider.propTypes = {
  list: PropTypes.arrayOf(objectOf(oneOfType([number, string, array, bool]))).isRequired,
};

export default Slider;
