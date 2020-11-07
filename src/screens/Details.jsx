import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as CONST from '../util/const';
import '../style/details.css';
import star from '../images/rating.png';
import Scroller from '../components/Scroller';

const Details = ({ location, history }) => {
  const [data, setData] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [genres, setGenres] = useState('');
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [runTime, setRumTime] = useState('');

  useEffect(() => {
    const type = location.pathname.slice(9);
    const id = location.search.slice(1);

    axios.get(`${CONST.BASE}/${type}/${id}`, {
      params: {
        api_key: CONST.API_KEY,
      },
    }).then((results) => {
      setData(results.data);
      console.log(results.data);
      setGenres(results.data.genres.map((genre) => genre.name).join(', '));
      setTitle(type === 'tv' ? results.data.name : results.data.title);
      setReleaseDate(type === 'tv' ? results.data.first_air_date : results.data.release_date);
      setRumTime(type === 'tv' ? results.data.episode_run_time[0] : results.data.runtime);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });

    axios.get(`${CONST.BASE}/${type}/${id}/credits`, {
      params: {
        api_key: CONST.API_KEY,
      },
    }).then((results) => {
      setCast(results.data.cast);
      setCrew(results.data.crew);
      console.log(results.data.crew);
    }).catch((err) => {
      console.log(err, 'credits');
    });
  }, []);

  const displayCrew = (crew) => {
    let crewArr = [];
    crew.filter((member) => member.job === 'Director' || member.department === 'Writing')
      .forEach((member) => {
        let crewObj = {};
        if (crewArr.length === 0) {
          crewObj[member.name] = member.job;
          crewArr.push(crewObj);
        }
        crewArr.forEach((person) => {
          if (person[0] === member.name) {
            crewObj[member.name] = [...crewObj[member.name], member.job];
          } else {
            crewObj[member.name] = member.job;
          }
        });
        crewArr.push(crewObj);
      });
    console.log(crewArr);
  };

  return (
    <div className="details-container">
      <div className="details-background">
        <img
          src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`}
          alt="backdrop"
        />
      </div>
      <div className="position-container">
        <div className="poster-container">
          <img
            className="details-poster"
            src={`http://image.tmdb.org/t/p/w342${data.poster_path}`}
            alt="poster"
          />
        </div>
        <div className="synopsis-container">
          <div className="details-title">
            {data.length === 0 ? '' : `${title}(${releaseDate.slice(0, 4)})`}
          </div>
          <div>
            {genres}
            {` - ${Math.trunc(runTime / 60)}h${runTime % 60}m`}
          </div>
          <div className="details-rating">
            <img className="details-star" src={star} alt="star" />
            {`${data.vote_average}/10`}
          </div>
          <div className="details-overview">
            <h2>
              Overview
            </h2>
            {data.overview}
            <div className="crew-list">
              {crew ? displayCrew(crew) : ' '}
            </div>
          </div>
        </div>
      </div>
      <div className="facts-container">
        <div className="cast-container">
          Cast
          <Scroller
            history={history}
            list={cast}
            type="person"
          />
        </div>
        <div className="movie-facts">
          <p>
            <strong>Status</strong>
            {data.status}
          </p>
          <p>
            <strong>Original Language</strong>
            {data.original_language}
          </p>
          <p>
            <strong>Budget</strong>
            {data.budget ? `$${data.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '-'}
          </p>
          <p>
            <strong>Revenue</strong>
            {data.revenue ? `$${data.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
