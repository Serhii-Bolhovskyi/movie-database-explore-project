import {fetchMovies} from './api/api.js'
import movieCard from './components/CardOfMovie.js';

// const search = document.getElementById('search-btn');
// search.addEventListener('click', fetchMovies())

const renderMovieCard = async () => {
    const query = document.getElementById('search-input').value;
    const movieContainer = document.getElementById('movie-container');
  
    try {
      const movies = await fetchMovies(query);
      // movieContainer.innerHTML = "";
      const movieCards = movies.map(movie => movieCard({ movie })).join('');
      movieContainer.innerHTML = movieCards;
    } catch (error) {
      movieContainer.innerHTML = '<p class="text-white">Error fetching movies. Please try again.</p>';
    }
}

renderMovieCard()



