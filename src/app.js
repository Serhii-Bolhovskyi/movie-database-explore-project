import {fetchMovies} from './api/api.js'
import movieCard from './components/CardOfMovie.js';

// const search = document.getElementById('search-btn');

// const renderMovieCard = async () => {
//     const query = document.getElementById('search-input').value;
//     const movieContainer = document.getElementById('movie-container');
  
//     try {
//       movieContainer.innerHTML = '<p>Loading...</p>';
//       const movies = await fetchMovies(query);
//       movieContainer.innerHTML = "";
//       const movieCards = movies.map(movie => movieCard({ movie })).join('');
//       movieContainer.innerHTML = movieCards;
//     } catch (error) {
//       movieContainer.innerHTML = '<p>Error fetching movies. Please try again.</p>';
//     }
// }

// search.addEventListener('click', renderMovieCard())

document.getElementById('search-btn').addEventListener('click', async () => {
  const query = document.getElementById('search-input').value;
  const movieContainer = document.getElementById('movie-container');

  try {
    movieContainer.innerHTML = '<p>Loading...</p>';
    const movies = await fetchMovies(query);
    const movieCards = movies.map(movie => movieCard({ movie })).join('');
    movieContainer.innerHTML = movieCards;
  } catch (error) {
    movieContainer.innerHTML = '<p>Error fetching movies. Please try again.</p>';
  }
});
