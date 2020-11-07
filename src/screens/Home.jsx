/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Scroller from '../components/Scroller';
import Slider from '../components/Slider';
import '../style/home.css';
import * as CONST from '../util/const';

const Home = ({ history }) => {
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const getPopular = axios.get(CONST.BASE + CONST.POPULAR, {
      params: {
        api_key: CONST.API_KEY,
      },
    });
    const getUpcoming = axios.get(CONST.BASE + CONST.UPCOMING, {
      params: {
        api_key: CONST.API_KEY,
      },
    });
    const getNowPlaying = axios.get(CONST.BASE + CONST.NOW_PLAYING, {
      params: {
        api_key: CONST.API_KEY,
      },
    });
    const getTrending = axios.get(CONST.BASE + CONST.TRENDING, {
      params: {
        api_key: CONST.API_KEY,
      },
    });

    axios.all([getPopular, getUpcoming, getNowPlaying, getTrending])
      .then(axios.spread((...results) => {
        setPopular(results[0].data.results);
        setUpcoming(results[1].data.results);
        setNowPlaying(results[2].data.results);
        setTrending(results[3].data.results);
      })).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="list-container">
        <div className="slider-container">
          <Slider list={trending} />
        </div>
      </div>
      <div className="list-container">
        <div className="movie-list">
          <div>
            <h1>Upcoming Movies</h1>
          </div>
          <Scroller history={history} list={upcoming} />
        </div>
      </div>
      <div className="list-container">
        <div className="movie-list">
          <div>
            <h1>Popular Movies</h1>
          </div>
          <Scroller history={history} list={popular} />
        </div>
      </div>
      <div className="list-container">
        <div className="movie-list">
          <div>
            <h1>Now Playing</h1>
          </div>
          <Scroller history={history} list={nowPlaying} />
        </div>
      </div>
    </div>
  );
};

export default Home;
