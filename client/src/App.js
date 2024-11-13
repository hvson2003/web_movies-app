import './App.css';
import api from './configs/axiosConfig';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`api/v1/movies/${movieId}`);

      const movie = response.data;
      setMovie(movie);      
      setReviews(movie.reviewIds);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path='/Trailer/:ytTrailerId' element={<Trailer />} />
          <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
